import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"; 
import bcrypt from "bcrypt";

const registerUser = asyncHandler(async (req, res) => {
    // we need these 4 fields to register the user.
    const { fullName, email, password, role } = req.body;

    // if any one of these are not present, throw an error.
    if (!fullName || !email || !password) {
        throw new ApiError(400, "All fields are required"); 
    }

    // if a user with the same email is already registered, throw an error
    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    // create the new user with the fields
    const user = await User.create({ fullName, email, password, role });
    
    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    // if everything is done, return a success message
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );
});

export const loginUser = asyncHandler(async (req, res) => {
    // we need the email and password fields to login the user
    const { email, password } = req.body;

    // have to ensure both fields are provided
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required");
    }

    // next up, find the user in the database
    const user = await User.findOne({ email });
    // if not there, throw an error. (can't login an unregistered user)
    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // check if the password matches (which was hashed while registering the user)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    // if password is valid as well, the user is legitimate. generate the access Token
    const token = jwt.sign(
        { 
            _id: user._id, 
            email: user.email, 
            role: user.role 
        },
        process.env.ACCESS_TOKEN,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );

    // remove password from the response (for security purposes)
    const loggedInUser = await User.findById(user._id).select("-password");

    // send the token in an HTTP-only cookie
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    };

    // return a JSON response containing the token, and a success message
    return res
        .status(200)
        .cookie("accessToken", token, options)
        .json(
            new ApiResponse(
                200, 
                { user: loggedInUser, token }, 
                "User logged in successfully"
            )
        );
});

export const logoutUser = asyncHandler(async (req, res) => {
    const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production"
    };

    // to logout the user, remove their access token (this is done by clearing the cookie)
    return res
        .status(200)
        .clearCookie("accessToken", cookieOptions)
        .json(new ApiResponse(200, {}, "User logged out successfully")); // nothing to return, hence {} used
});

export { 
    registerUser,
    loginUser,
    logoutUser
 };
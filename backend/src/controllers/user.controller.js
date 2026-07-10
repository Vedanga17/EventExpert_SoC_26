import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js"; // Import it

// Notice we wrapped the async function inside asyncHandler()
const registerUser = asyncHandler(async (req, res) => {
    
    // NO MORE TRY...CATCH BLOCKS! Just pure business logic.
    
    const { fullName, email, password, role } = req.body;

    if (!fullName || !email || !password) {
        // When you throw an ApiError here, the asyncHandler catches it instantly
        throw new ApiError(400, "All fields are required"); 
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
        throw new ApiError(409, "User with this email already exists");
    }

    const user = await User.create({ fullName, email, password, role });
    
    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered successfully")
    );
});

export { registerUser };
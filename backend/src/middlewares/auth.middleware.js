import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        // get the token from the cookies. if not there, get it from the Authorization header
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        // if no token was found, we cannot provide them access. throw an error.
        if (!token || token === "undefined" || token === "null") {
            throw new ApiError(401, "Unauthorized request. Please log in.");
        }

        // if a token was found, now we have to check if it is valid using our access token.
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN);

        // next, find the user in the database (and don't select the password)
        const user = await User.findById(decodedToken._id).select("-password");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        // attach the user object to the request
        req.user = user;
        
        // Now that the work is done, pass the control to the next function (since it is a middleware)
        next();
    } catch (error) {
        // if at any stage an error is there, throw an error, stating that the access token is invalid.
        throw new ApiError(401, error?.message || "Invalid access token");
    }
});

export {verifyJWT};
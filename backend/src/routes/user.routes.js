import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// POST route: /api/v1/users/register
router.route("/register").post(registerUser);

// POST route: /api/v1/users/login
router.route("/login").post(loginUser);

// POST route: /api/v1/users/logout
router.route("/logout").post(verifyJWT, logoutUser);

export default router;  
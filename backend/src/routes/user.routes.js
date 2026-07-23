import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";

const router = Router();

// POST route: /api/v1/users/register
router.route("/register").post(registerUser);

// POST route: /api/v1/users/login
router.route("/login").post(loginUser);

export default router;  
import { Router } from "express";
import { createEvent } from "../controllers/event.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Every route in this file will require the user to be logged in
router.use(verifyJWT); 

router.route("/create").post(createEvent);

export default router;
import { Router } from "express";
import { createEvent, rsvpEvent, getAllEvents, deleteEvent, updateEvent, getMyEvents } from "../controllers/event.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Every route in this file will require the user to be logged in
router.use(verifyJWT); 

router.route("/create").post(createEvent);
router.route("/all").get(getAllEvents);
router.route("/my-events").get(getMyEvents);
router.route("/:eventId/rsvp").post(rsvpEvent);
router.route("/:eventId").delete(deleteEvent);
router.route("/:eventId").patch(updateEvent);

export default router;
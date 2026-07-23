import { Event } from "../models/event.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createEvent = asyncHandler(async (req, res) => {
    const { title, description, eventDate, venue, capacity } = req.body;

    // ensure no fields are empty
    if (!title || !description || !eventDate || !venue || !capacity) {
        throw new ApiError(400, "All fields are required");
    }

    // create the event in the database
    const event = await Event.create({
        title,
        description,
        eventDate,
        venue,
        capacity,
        // we pull the ID directly from the logged-in user
        createdBy: req.user._id 
    });

    // check if creation failed
    if (!event) {
        throw new ApiError(500, "Something went wrong while creating the event");
    }

    // if no issue, we can return a success message
    return res.status(201).json(
        new ApiResponse(201, event, "Event created successfully")
    );
});

export {
    createEvent
};
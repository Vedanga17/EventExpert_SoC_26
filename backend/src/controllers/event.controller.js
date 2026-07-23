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

const getAllEvents = asyncHandler(async (req, res) => {
    // 1. Fetch all events from the database
    // The .populate() method is where that "ref" we set up earlier shines!
    // It automatically fetches the creator's name and email so we can display it.
    const events = await Event.find()
        .populate("createdBy", "fullName email") 
        .sort({ createdAt: -1 }); // Sorts by newest first

    // 2. Return the events
    return res.status(200).json(
        new ApiResponse(200, events, "Events fetched successfully")
    );
});

const rsvpEvent = asyncHandler(async (req, res) => {
    // we get the req from the middleware, so we can access multiple things easily.
    const { eventId } = req.params;
    const userId = req.user._id; 

    const event = await Event.findById(eventId);
    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    // Check if the user's ID is already inside the attendees array
    const hasRSVPd = event.attendees.includes(userId);

    if (hasRSVPd) {
        // If they already RSVP'd, remove them (Cancel RSVP)
        event.attendees.pull(userId);
    } else {
        // If they haven't, add them
        event.attendees.push(userId);
    }

    await event.save();

    return res.status(200).json(
        new ApiResponse(
            200, 
            { hasRSVPd: !hasRSVPd, attendeesCount: event.attendees.length }, 
            hasRSVPd ? "RSVP cancelled successfully!" : "RSVP successful!"
        )
    );
});

// --- DELETE EVENT CONTROLLER ---
const deleteEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;
    
    const event = await Event.findById(eventId);
    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    // Security check: Only the creator can delete it
    // We use .toString() because MongoDB ObjectIds can sometimes fail standard === comparisons
    if (event.createdBy.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You do not have permission to delete this event");
    }

    await event.deleteOne();

    return res.status(200).json(
        new ApiResponse(200, {}, "Event deleted successfully")
    );
});

// --- UPDATE EVENT CONTROLLER ---
const updateEvent = asyncHandler(async (req, res) => {
    const { eventId } = req.params;
    
    const event = await Event.findById(eventId);
    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    if (event.createdBy.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "You do not have permission to edit this event");
    }

    // Update the event with whatever new data was sent in the request body
    const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        { $set: req.body }, 
        { new: true } // This returns the newly updated document
    );

    return res.status(200).json(
        new ApiResponse(200, updatedEvent, "Event updated successfully")
    );
});

export {
    createEvent,
    getAllEvents, 
    rsvpEvent,
    updateEvent,
    deleteEvent
};
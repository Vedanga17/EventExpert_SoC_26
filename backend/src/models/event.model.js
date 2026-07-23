import mongoose, { Schema } from "mongoose";

const eventSchema = new Schema(
    {
        title: { // name of event
            type: String,
            required: true,
            trim: true,
            index: true, 
        },
        description: { // description of event
            type: String,
            required: true,
        },
        eventDate: {
            type: Date,
            required: true,
        },
        venue: {
            type: String,
            required: true,
        },
        capacity: {
            type: Number,
            required: true,
        },
        speakers: [
            {
                type: Schema.Types.ObjectId,
                ref: "User", // using the user model defined in the user schema
            }
        ],
        attendees: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        
        // Suppose a user wants to delete or update an event. need this to ensure that only the person who created this event
        // can do that. 
        createdBy: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    { 
        timestamps: true 
    }
);

export const Event = mongoose.model("Event", eventSchema);
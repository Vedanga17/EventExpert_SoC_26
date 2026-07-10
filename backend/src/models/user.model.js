import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true // Makes searching by name faster
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        role: {
            type: String,
            enum: ["ATTENDEE", "SPEAKER", "ADMIN"], // Restricts inputs to these three roles
            default: "ATTENDEE"
        }
    },
    {
        timestamps: true // Automatically adds createdAt and updatedAt fields
    }
);

export const User = mongoose.model("User", userSchema);
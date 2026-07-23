import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

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

// hash the password JUST BEFORE saving the user (this is a pre-hook)

userSchema.pre("save", async function (next) {
    // If the password hasn't been modified (e.g. just updating a username), skip hashing
    if (!this.isModified("password")) return next();

    // Hash the password
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

export const User = mongoose.model("User", userSchema);
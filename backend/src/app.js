import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, // This allows the JWT/cookies to be passed
}));

app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));

// Route Imports
import userRouter from "./routes/user.routes.js";
import eventRouter from "./routes/event.routes.js";

// User route Declaration 
app.use("/api/v1/users", userRouter);

// Event route Declaration
app.use("/api/v1/events", eventRouter);

export { app };
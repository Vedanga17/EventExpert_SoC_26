import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json({ limit: "16kb" }));

// Route Imports
import userRouter from "./routes/user.routes.js";

// Route Declaration (RESTful standard versioning)
app.use("/api/v1/users", userRouter);

export { app };
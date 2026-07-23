// Load environment variables as early as possible
import dotenv from "dotenv";
import connectDB from "./db/connector.js";
import { app } from "./app.js";

dotenv.config({
    path: './.env' 
});

// Connect to MongoDB, then start the server
connectDB()
    .then(() => {
        // The app listens on the port specified in .env, or defaults to 8000
        const port = process.env.PORT || 8000;
        
        // if it has started listening, log a success message.
        app.listen(port, () => {
            console.log(`Server is running at port : ${port}`);
        });
    })
    .catch((err) => {
        console.error("MongoDB connection failed !!! ", err);
    });
# EventExpert - Backend API

The server-side infrastructure for EventExpert, built with Node.js, Express, and MongoDB.

## 🏗️ Architecture
This API is built using a highly modular, scalable structure:
- **`controllers/`**: Contains the core business logic (e.g., user registration, authentication).
- **`models/`**: Mongoose schemas defining the MongoDB database structure.
- **`routes/`**: API endpoint definitions routing requests to the appropriate controllers.
- **`utils/`**: Reusable helper classes, including standardized `ApiError`, `ApiResponse`, and a custom `asyncHandler` to eliminate redundant `try...catch` blocks.

## 🚦 RESTful Standards
All endpoints follow strict RESTful design principles and return standardized JSON responses, utilizing appropriate HTTP status codes (201 Created, 400 Bad Request, 409 Conflict, etc.).

## 💻 Local Setup
1. Navigate to the backend directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file in the root of the `/backend` directory and add the following variables:
   ```env
   PORT=8000
   CORS_ORIGIN=http://localhost:5173
   MONGO_URI=your_mongodb_atlas_connection_string
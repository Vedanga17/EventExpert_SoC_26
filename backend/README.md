# EventExpert Backend

This folder contains the Express + MongoDB API for EventExpert. It handles authentication, event management, and RSVP actions for the frontend.

## ✅ Backend capabilities
- Register a new user
- Log in and log out securely
- Create, update, delete, and list events
- Fetch “all events” and “my events” separately
- Toggle RSVP attendance for an event
- Protect routes with JWT authentication middleware

## 🧱 Project structure
- src/app.js: Express app setup and route mounting
- src/controllers/: user and event business logic
- src/routes/: API endpoints for users and events
- src/models/: Mongoose schemas for users and events
- src/middlewares/: JWT authentication middleware
- src/utils/: reusable response and error helpers

## 🔗 API overview
- POST /api/v1/users/register — register a user
- POST /api/v1/users/login — log in a user
- POST /api/v1/users/logout — clear the auth cookie
- POST /api/v1/events/create — create an event
- GET /api/v1/events/all — list all events
- GET /api/v1/events/my-events — list the current user’s events
- POST /api/v1/events/:eventId/rsvp — toggle RSVP status
- PATCH /api/v1/events/:eventId — update an event
- DELETE /api/v1/events/:eventId — delete an event

## ⚙️ Environment variables
Create a `.env` file inside the backend folder with:

```env
PORT=8000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
ACCESS_TOKEN=your_secret_key
ACCESS_TOKEN_EXPIRY=1d
CORS_ORIGIN=http://localhost:5173
```

## ▶️ Run locally
```bash
cd backend
npm install
npm run dev
```

The API will run on http://localhost:8000 by default.
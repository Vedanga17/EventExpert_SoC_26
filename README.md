# EventExpert

EventExpert is a full-stack event management platform built with the MERN stack. It allows users to register, log in, browse events, create and manage their own events, and RSVP to events they want to attend.

## ✨ What’s implemented
- User authentication with registration, login, and logout
- JWT-based authentication using HTTP-only cookies
- Event creation, editing, deletion, and listing
- RSVP toggle support with attendee count tracking
- A dashboard that shows all events and a separate “My Events” view
- Redux Toolkit-based auth state management with persistence in local storage

## 🛠️ Tech stack
- Frontend: React, Vite, React Router, Redux Toolkit, Axios
- Backend: Node.js, Express, MongoDB, Mongoose, JWT, bcrypt

## 📁 Project structure
- backend/: Express API, MongoDB models, controllers, routes, authentication middleware
- frontend/: React/Vite client, pages, Redux store, styling

## ▶️ Getting started
1. Clone the repository
2. Install dependencies in both folders:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
3. Create a `.env` file in the backend folder with the variables shown in the backend README.
4. Start the backend:
   ```bash
   cd backend
   npm run dev
   ```
5. Start the frontend in another terminal:
   ```bash
   cd frontend
   npm run dev
   ```
6. Open http://localhost:5173 in your browser.

## 🔗 Main user flow
- Register or log in from the auth pages
- Access the dashboard to view events
- Create a new event from the dashboard
- Edit or delete events you created
- Toggle RSVP for any event

For detailed setup and API usage, see the backend and frontend README files.
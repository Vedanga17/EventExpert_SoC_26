# EventExpert Frontend

This folder contains the React/Vite client for EventExpert. It provides the pages for registration, login, event browsing, event creation, editing, and RSVPs.

## ✅ Current frontend features
- Register and login pages
- Protected dashboard experience
- Event feed with All Events and My Events filters
- Create Event page
- Edit Event page
- RSVP and cancel RSVP actions
- Logout flow that clears local auth state

## 🧩 Main pages
- /register — user registration
- /login — user login
- /dashboard — event dashboard
- /create-event — create a new event
- /edit-event/:id — edit an existing event

## 🧠 State management
The app uses Redux Toolkit to store authentication state. User info is persisted in local storage so login status survives refreshes.

## ▶️ Run locally
```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

> Make sure the backend is running on http://localhost:8000 so the frontend can communicate with the API.

## 🧪 Useful commands
```bash
npm run build
npm run lint
npm run preview
```
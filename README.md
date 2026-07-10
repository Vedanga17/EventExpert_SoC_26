# EventExpert

A modern, full-stack event management and registration platform built with the MERN stack (MongoDB, Express, React, Node.js). 

This project utilizes a monorepo architecture, cleanly separating the client-side React application from the server-side Express API, ensuring scalable and maintainable code.

## 🚀 Key Technical Highlights
- **Modular Backend Architecture:** Built with Node.js and Express, strictly adhering to RESTful API design principles with separated routes, controllers, and centralized error handling.
- **Global State Management:** Utilizes Redux Toolkit for predictable state management across the React frontend.
- **API Integration:** Seamless client-server communication using Axios and custom React hooks (`useEffect`, `useSelector`, `useNavigate`).

## 📁 Repository Structure
- `/backend`: The Node.js/Express server, MongoDB models, and RESTful API routes.
- `/frontend`: The React.js (Vite) client application, Redux store, and CSS Modules.

## 🛠️ Getting Started
To run this project locally, you will need two terminal windows to run the frontend and backend concurrently.

1. Clone the repository: `git clone https://github.com/yourusername/EventExpert.git`
2. Follow the setup instructions in the respective `/backend` and `/frontend` README files.
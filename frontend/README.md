# EventExpert - Frontend Client

The client-side user interface for EventExpert, built with React (Vite) and standard CSS Modules for clean, scoped styling.

## 🧠 State Management & Hooks
This application relies on **Redux Toolkit** to manage global user state. The authentication flow heavily utilizes modern React hooks:

* **`useSelector`**: To extract user data from the global Redux store for the UI.
* **`useDispatch`**: To send API responses directly into the global state.
* **`useNavigate`**: For client-side routing based on authentication status.
* **`useEffect`**: To intercept rendering and redirect users based on active sessions.

## 💻 Local Setup
Follow these steps to run the frontend client locally:

1. Navigate to the frontend directory: `cd frontend`
2. Install the necessary dependencies: `npm install`
3. Start the Vite development server: `npm run dev`
4. Open `http://localhost:5173` in your browser.

> **Note:** Ensure the backend API is running concurrently on port 8000 for full functionality.
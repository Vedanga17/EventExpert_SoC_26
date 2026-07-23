import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard'; 
import CreateEvent from './pages/CreateEvent';
import EditEvent from './pages/EditEvent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        
        {/* The Dashboard Route */}
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        <Route path="/edit-event/:id" element={<EditEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
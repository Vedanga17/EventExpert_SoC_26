import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect the root URL straight to the register page for now */}
        <Route path="/" element={<Navigate to="/register" replace />} />
        
        {/* The actual Register Route */}
        <Route path="/register" element={<Register />} />
        
        {/* You will add a Dashboard route here later! */}
      </Routes>
    </Router>
  );
}

export default App;
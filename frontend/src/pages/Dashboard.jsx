import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../store/authSlice';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Pull the user data directly from the Redux store
    const userData = useSelector((state) => state.auth.userData);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/register');
    };

    return (
        <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>EventExpert Dashboard</h1>
                <button 
                    onClick={handleLogout}
                    style={{ padding: '0.5rem 1rem', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                    Logout
                </button>
            </header>

            <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                <h2>Welcome aboard, {userData?.fullName || 'Guest'}!</h2>
                <p><strong>Registered Email:</strong> {userData?.email}</p>
                <p><strong>System Role:</strong> {userData?.role}</p>
                
                <hr style={{ margin: '2rem 0' }} />
                
            </div>
            <button 
                onClick={() => navigate('/create-event')}
                style={{padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', 
                cursor: 'pointer', marginBottom: '1rem' }}
                >
                + Create New Event
            </button>
        </div>
        
    );
};

export default Dashboard;
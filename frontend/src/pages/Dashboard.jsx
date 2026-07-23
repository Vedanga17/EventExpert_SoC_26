import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'; // 1. Import this to get the logged-in user's ID
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { logout  } from '../store/authSlice';

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const handleLogout = async () => {
        try {
            // Hit the backend to clear the cookie
            await axios.post('http://localhost:8000/api/v1/users/logout');
            
            // Dispatch the Redux action to clear localStorage and Redux state
            dispatch(logout());
            
            // Boot them back to the login page
            navigate('/login');
        } catch (err) {
            console.error("Failed to log out", err);
        }
    };

    // 2. Pull the current user from Redux so we know who is clicking the button
    const currentUser = useSelector((state) => state.auth.userData);
    

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/v1/events/all');
            setEvents(response.data.data); 
            setLoading(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to fetch events.');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // 3. The RSVP Function
    const handleRSVP = async (eventId) => {
        try {
            await axios.post(`http://localhost:8000/api/v1/events/${eventId}/rsvp`);
            // Refresh the feed to show the updated attendee counts
            fetchEvents(); 
        } catch (err) {
            console.error("Failed to RSVP", err);
            alert("Could not update RSVP status.");
        }
    };

    const handleDelete = async (eventId) => {
        // A quick browser confirmation so they don't accidentally delete an event
        if (window.confirm("Are you sure you want to delete this event? This cannot be undone.")) {
            try {
                await axios.delete(`http://localhost:8000/api/v1/events/${eventId}`);
                // Refresh the feed to remove the deleted event from the screen
                fetchEvents();
            } catch (err) {
                console.error("Failed to delete", err);
                alert(err.response?.data?.message || "Could not delete event.");
            }
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '50px auto', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Event Dashboard</h2>
                <button 
                    onClick={() => navigate('/create-event')}
                    style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                    + Create New Event
                </button>
                <button 
                        onClick={handleLogout}
                        style={{ padding: '0.5rem 1rem', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Logout
                    </button>
            </div>

            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}

            {loading ? (
                <p>Loading your feed...</p>
            ) : (
                <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {events.length === 0 ? (
                        <p>No events found. Be the first to create one!</p>
                    ) : (
                        events.map((event) => {
                            // Safely check if the current user is in the attendees array
                            const isAttending = event.attendees?.includes(currentUser?._id);

                            return (
                                <div key={event._id} style={{ border: '1px solid #ddd', padding: '1.5rem', borderRadius: '8px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                                    <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{event.title}</h3>
                                    <p style={{ color: '#666', marginBottom: '1rem' }}>{event.description}</p>
                                    
                                    <div style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', color: '#555', marginBottom: '1rem' }}>
                                        <span><strong>Venue:</strong> {event.venue}</span>
                                        <span><strong>Capacity:</strong> {event.attendees?.length || 0} / {event.capacity}</span>
                                        <span><strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}</span>
                                    </div>
                                    
                                    {/* 4. The RSVP Button */}
                                    <button 
                                        onClick={() => handleRSVP(event._id)}
                                        style={{ 
                                            padding: '0.5rem 1rem', 
                                            backgroundColor: isAttending ? '#dc3545' : '#28a745', 
                                            color: 'white', 
                                            border: 'none', 
                                            borderRadius: '4px', 
                                            cursor: 'pointer',
                                            fontWeight: 'bold'
                                        }}
                                    >
                                        {isAttending ? 'Cancel RSVP' : 'RSVP Now'}
                                    </button>

                                    {currentUser && event.createdBy && currentUser._id === event.createdBy._id && (
        <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            
            <button 
    onClick={() => navigate(`/edit-event/${event._id}`, { state: { event } })}
    style={{ padding: '0.4rem 0.8rem', backgroundColor: '#ffc107', color: '#000', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
>
    Edit Event
</button>
            <button 
                onClick={() => handleDelete(event._id)}
                style={{ padding: '0.4rem 0.8rem', backgroundColor: '#343a40', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
                Delete Event
            </button>
        </div>
    )}

                                    {event.createdBy && (
                                        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #eee', fontSize: '0.85rem', color: '#888' }}>
                                            Organized by: {event.createdBy.fullName} ({event.createdBy.email})
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
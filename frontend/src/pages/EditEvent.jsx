import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditEvent = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    
    // We catch the event data passed from the Dashboard
    const existingEvent = location.state?.event;

    // Pre-fill the state with the existing data
    const [formData, setFormData] = useState({
        title: existingEvent?.title || '',
        description: existingEvent?.description || '',
        venue: existingEvent?.venue || '',
        capacity: existingEvent?.capacity || '',
        // Format the date so the HTML date input can read it
        eventDate: existingEvent?.eventDate ? new Date(existingEvent.eventDate).toISOString().split('T')[0] : ''
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Hit the update controller we built earlier!
            await axios.patch(`http://localhost:8000/api/v1/events/${id}`, formData);
            navigate('/dashboard'); // Send them back to the feed
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update event.');
        }
    };

    if (!existingEvent) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Event data not found. Please return to the dashboard.</p>;

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2>Edit Event</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <input type="text" name="title" value={formData.title} onChange={handleChange} required style={{ padding: '0.8rem' }} />
                
                <textarea name="description" value={formData.description} onChange={handleChange} required rows="4" style={{ padding: '0.8rem' }} />
                
                <input type="text" name="venue" value={formData.venue} onChange={handleChange} required style={{ padding: '0.8rem' }} />
                
                <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required style={{ padding: '0.8rem' }} />
                
                <input type="date" name="eventDate" value={formData.eventDate} onChange={handleChange} required style={{ padding: '0.8rem' }} />
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button type="submit" style={{ flex: 1, padding: '0.8rem', backgroundColor: '#28a745', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                        Save Changes
                    </button>
                    <button type="button" onClick={() => navigate('/dashboard')} style={{ flex: 1, padding: '0.8rem', backgroundColor: '#6c757d', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditEvent;
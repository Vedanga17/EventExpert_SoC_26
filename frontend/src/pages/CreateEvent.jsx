import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        eventDate: '',
        venue: '',
        capacity: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Pull the token from Redux to pass the backend Gatekeeper
    const token = useSelector((state) => state.auth.token);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const response = await axios.post(
                'http://localhost:8000/api/v1/events/create',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}` // Injecting the JWT!
                    },
                    withCredentials: true // Important if you are also using cookies
                }
            );

            if (response.status === 201) {
                setSuccess('Event created successfully!');
                setTimeout(() => navigate('/dashboard'), 2000); // Route back to dashboard after 2 seconds
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create event.');
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '50px auto', padding: '2rem', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
            <h2>Create a New Event</h2>
            {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
            {success && <p style={{ color: 'green', fontWeight: 'bold' }}>{success}</p>}
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Event Title (e.g., Annual Tech Summit)" 
                    value={formData.title} 
                    onChange={handleChange} 
                    required 
                    style={{ padding: '0.5rem' }}
                />
                <textarea 
                    name="description" 
                    placeholder="Event Description" 
                    value={formData.description} 
                    onChange={handleChange} 
                    required 
                    style={{ padding: '0.5rem', minHeight: '80px' }}
                />
                <input 
                    type="datetime-local" 
                    name="eventDate" 
                    value={formData.eventDate} 
                    onChange={handleChange} 
                    required 
                    style={{ padding: '0.5rem' }}
                />
                <input 
                    type="text" 
                    name="venue" 
                    placeholder="Venue / Location" 
                    value={formData.venue} 
                    onChange={handleChange} 
                    required 
                    style={{ padding: '0.5rem' }}
                />
                <input 
                    type="number" 
                    name="capacity" 
                    placeholder="Maximum Capacity (e.g., 500)" 
                    value={formData.capacity} 
                    onChange={handleChange} 
                    required 
                    min="1"
                    style={{ padding: '0.5rem' }}
                />
                <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Publish Event
                </button>
            </form>
        </div>
    );
};

export default CreateEvent;
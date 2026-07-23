import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { login } from '../store/authSlice';
import styles from './Register.module.css';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const authStatus = useSelector((state) => state.auth.status);
    
    // State to hold all form fields required by the backend
    const [formData, setFormData] = useState({ 
        fullName: '', 
        email: '', 
        password: '', 
        role: 'ATTENDEE' 
    });

    useEffect(() => {
        // If already logged in, redirect to dashboard
        if (authStatus) navigate('/dashboard');
    }, [authStatus, navigate]);

    // This function automatically updates the state whenever the user types in any input box
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
        const response = await axios.post('http://localhost:8000/api/v1/users/register', formData);
        
        if (response.data.success) {
            // Dispatch the user data and token to Redux immediately
            dispatch(login({
                userData: response.data.data.user,
                token: response.data.data.token
            }));
            
            // Route straight to the dashboard or event creation
            navigate('/dashboard'); 
        }
    } catch (err) {
        setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
};

    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h2>Register for EventExpert</h2>
            
            <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>

            <div className={styles.inputGroup}>
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className={styles.inputGroup}>
                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>

            <div className={styles.inputGroup}>
                <label>Role</label>
                <select name="role" value={formData.role} onChange={handleChange} className={styles.selectInput}>
                    <option value="ATTENDEE">Attendee</option>
                    <option value="SPEAKER">Speaker</option>
                    <option value="ADMIN">Admin</option>
                </select>
            </div>

            <button type="submit" className={styles.submitButton}>
                Register User
            </button>
            <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.9rem' }}>
                <p style={{ color: '#555' }}>
                    Already have an account?{' '}
                    <span 
                        onClick={() => navigate('/login')} 
                        style={{ color: '#007bff', cursor: 'pointer', fontWeight: 'bold', textDecoration: 'underline' }}
                    >
                        Log in here
                    </span>
                </p>
            </div>
        </form>
        
    );
};

export default Register;
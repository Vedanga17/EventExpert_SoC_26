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
        try {
            const response = await axios.post('http://localhost:8000/api/v1/users/register', formData);
            if (response.data.success) {
                dispatch(login({ userData: response.data.data }));
                navigate('/dashboard'); 
            }
        } catch (error) {
            console.error("Registration failed:", error.response?.data?.message);
            alert(error.response?.data?.message || "Registration failed");
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
        </form>
    );
};

export default Register;
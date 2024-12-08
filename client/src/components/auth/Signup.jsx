import React, { useState } from 'react';
import axios from 'axios';
import '../styles/auth.css';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.username || !formData.email || !formData.password) {
            setError('All fields are required!');
            return;
        }

        try {
            const response = await axios.post('/api/auth/register', formData);
            console.log(response.data);
            setSuccess('Signup successful!');
            setError('');
            setFormData({ username: '', email: '', password: '' });
        } catch (err) {
            setError(err.response?.data?.error || err.message || 'Something went wrong!');
            setSuccess('');
        }
    };

    return (
        <div className='form-box'>
            <form onSubmit={handleSubmit} className='form'>
                <h1 className='title'>Signup</h1>
                <div className='form-container'>
                <label htmlFor="username" id='username'>Username</label>
                <input
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="user@example.com"
                    value={formData.email}
                    onChange={handleChange}
                />
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                </div>
                <button type="submit">Signup</button>
            </form>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
        </div>
    );
};

export default Signup;
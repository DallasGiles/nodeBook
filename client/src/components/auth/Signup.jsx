import React, { useState } from 'react';
import '../styles/auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required.');
      setSuccess('');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      setSuccess('');
      return;
    }
    // Add signup logic here
    setError('');
    setSuccess('Signup successful!');
  };

  if (formData.password === formData.confirmPassword) {
    setError('');
    setSuccess('Signup successful!');
    localStorage.setItem('token', 'sampleToken'); // Simulate token storage
    window.location.href = '/'; // Redirect to homepage
  }

  return (
    <div className="form-box">
      <div className="title">Signup</div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-container">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            value={formData.firstName}
            onChange={handleChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
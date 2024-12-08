import React, { useState } from 'react';
import '../styles/auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    if (formData.email && formData.password) {
      setSuccess('Login successful!');
      setError('');
    } else {
      setError('Please fill in all fields.');
      setSuccess('');
    }
  };

  if (success) {
    localStorage.setItem('token', 'sampleToken'); // Simulate token storage
    window.location.href = '/'; // Redirect to homepage
  }

  return (
    <div className="form-box">
      <div className="title">Login</div>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-container">
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
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
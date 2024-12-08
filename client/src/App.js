import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import Homepage from './components/pages/home';

const App = () => {
    const isAuthenticated = localStorage.getItem('token'); 
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={isAuthenticated ? <Homepage /> : <Navigate to="/login" />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;

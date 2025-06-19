// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Consultations from './components/Consultations';
import Profile from './components/Profile';

// Bootstrap CSS & JS for navbar toggle
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// 🌐 Extract token info from URL (if redirected from userPanel)
const params = new URLSearchParams(window.location.search);
const token = params.get('token');
const userId = params.get('userId');
const role = params.get('role');

if (token) {
  localStorage.setItem('token', token);
  localStorage.setItem('userId', userId);
  localStorage.setItem('role', role);

  // Clean the URL (remove token from visible URL)
  const cleanUrl = window.location.origin + window.location.pathname;
  window.history.replaceState({}, document.title, cleanUrl);
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/vet/dashboard" />} />
        <Route path="/vet/dashboard" element={<Dashboard />} />
        <Route path="/vet/consultations" element={<Consultations />} />
        <Route path="/vet/profile" element={<Profile />} />
        <Route path="*" element={<h2 className="text-center mt-5">404 - Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Navigate to="/vet/dashboard" />} />
        <Route path="/vet/dashboard" element={<Dashboard />} />
        <Route path="/vet/consultations" element={<Consultations />} />
        <Route path="/vet/profile" element={<Profile />} />

        {/* Optional 404 fallback */}
        <Route path="*" element={<h2 className="text-center mt-5">404 - Page Not Found</h2>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

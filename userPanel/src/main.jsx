import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './index.css';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Animals from './components/Animals/Animals';
import AddAnimal from './components/Animals/AddAnimal';
import EditAnimal from './components/Animals/EditAnimals';
import AnimalView from './components/Animals/AnimalView';
import HomeSymptomPage from './components/Symptoms/HomeSymptomPage';
import Symptoms from './components/Symptoms/Symptoms';
import AddSymptoms from './components/Symptoms/AddSymptoms';
import EditSymptoms from './components/Symptoms/EditSymptoms';
import VetConsultationPage from './components/VetConsultation/VetConsultationPage';
import UserProfile from './components/Profile/UserProfile';
import Register from './components/Pages/Register';
import Login from './components/Pages/Login';

import { Navigate } from 'react-router-dom';

// Wrapper for routes with conditional navbar
const AppRoutes = () => {
  const location = useLocation();
  const hideNavbar = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/animal" element={<Animals />} />
        <Route path="/add-animal" element={<AddAnimal />} />
        <Route path="/edit-animal/:id" element={<EditAnimal />} />
        <Route path="/view-animal" element={<AnimalView />} />
        <Route path="/homesymptom" element={<HomeSymptomPage />} />
        <Route path="/viewsymptom" element={<Symptoms />} />
        <Route path="/addsymptom" element={<AddSymptoms />} />
        <Route path="/editsymptom/:id" element={<EditSymptoms />} />
        <Route path="/vetconsulthome" element={<VetConsultationPage />} />
        <Route path="/profile" element={<UserProfile />} />
      </Routes>
    </>
  );
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AppRoutes />
    </Router>
  </StrictMode>
);

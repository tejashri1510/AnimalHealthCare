// src/vetPanel/Navbar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

export default function VetNavbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <NavLink className="navbar-brand" to="/" id="nav-brand">
        PraniSakha Vet
      </NavLink>

      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#vetNav">
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="vetNav">
        <ul className="navbar-nav ms-auto">
          {['Dashboard','Consultations','Profile'].map((txt) => {
            const route = txt.toLowerCase().replace(/\s+/g, '');
            return (
              <li className="nav-item" key={txt}>
                <NavLink
                  className="nav-link"
                  to={`/vet/${route}`}
                  id={`nav-${route}`} // ✅ Add unique ID
                >
                  {txt}
                </NavLink>
              </li>
            );
          })}

          <li className="nav-item">
            <button
              className="btn btn-outline-light btn-sm ms-3"
              onClick={handleLogout}
              id="nav-logout" // ✅ Logout button ID
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

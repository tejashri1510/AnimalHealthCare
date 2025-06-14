import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './NavBar.module.css';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.leftSection}>
        <Link className={styles.title} to="/">PraniSakha</Link>
      </div>

      <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
      </div>

      <ul className={`${styles.menuItems} ${menuOpen ? styles.active : ''}`}>
        <li><Link to="/animal" onClick={() => setMenuOpen(false)}>Animals</Link></li>
        <li><Link to="/homesymptom" onClick={() => setMenuOpen(false)}>Symptoms</Link></li>
        <li><Link to="/vetconsulthome" onClick={() => setMenuOpen(false)}>Vet Consultation</Link></li>
      </ul>

      <div className={styles.profile} onClick={() => setProfileOpen(!profileOpen)}>
        <FaUserCircle className={styles.profileIcon} size={28} />
        {profileOpen && (
          <div className={styles.dropdown}>
            <Link to="/profile" onClick={() => setProfileOpen(false)}>Profile</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

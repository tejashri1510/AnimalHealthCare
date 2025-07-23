import React from 'react';
import styles from './Dashboard.module.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

 

  const cards = [
    {
      title: 'Consultations',
      description: 'View and reply to user questions',
      icon: '/icons/consultation.png',
      route: '/vet/consultations',
      action: () => navigate('/vet/consultations'),
    },
    {
      title: 'Profile',
      description: 'View and manage your vet profile',
      icon: '/icons/profile.png',
      route: '/vet/profile',
      action: () => navigate('/vet/profile'),
    },
   {
  title: 'Logout',
  description: 'Securely logout and return to login',
  icon: '/icons/logout.png',
   action: () => {
    localStorage.removeItem('token'); 
window.location.href = `${import.meta.env.VITE_USERPANEL_URL}/login`;
   }
},
  ];

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Vet Dashboard</h1>
      <div className={styles.cardGrid}>
        {cards.map((card) => (
          <div
            className={styles.card}
            key={card.title}
            onClick={card.action}
          >
            <img src={card.icon} alt={card.title} className={styles.icon} />
            <h3>{card.title}</h3>
            <p>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

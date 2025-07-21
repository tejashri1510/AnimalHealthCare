import React from 'react';
import styles from './HomeSymptomPage.module.css';
import { useNavigate } from 'react-router-dom';

const HomeSymptomPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container} id="homesymptom">
      <h2 className={styles.title}>🐾 Symptom Management Panel</h2>
      <p className={styles.subtitle}>Manage animal symptoms easily from here</p>
      <div className={styles.buttons}>
        <button onClick={() => navigate('/viewsymptom')} className={styles.btn}>🔍 View Symptoms</button>
        <button onClick={() => navigate('/addsymptom')} className={styles.btn}>➕ Add Symptom</button>
         <button onClick={() => navigate('/predictdisease')} className={styles.btn}>🧠 Predict Disease</button>
      </div>
    </div>
  );
};

export default HomeSymptomPage;

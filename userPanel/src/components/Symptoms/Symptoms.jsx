import React, { useEffect, useState } from 'react';
import SymptomCard from './SymtomCard'; // ✅ Correct spelling
import styles from './Symptoms.module.css';
import api from '../../api';

const Symptoms = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await api.get('/symptoms');
        setSymptoms(response.data);
      } catch (err) {
        console.error('Error fetching symptoms:', err);
        setError('Failed to load symptoms');
      } finally {
        setLoading(false);
      }
    };

    fetchSymptoms();
  }, []);

  const handleDelete = (id) => {
    setSymptoms(symptoms.filter(symptom => symptom._id !== id));
  };

  return (
    <div className={styles.container} id="viewsymptom">
      <h2 className={styles.title}>🐾 Animal Symptoms</h2>

      {loading ? (
        <div className={styles.message}>⏳ Loading symptoms...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : symptoms.length === 0 ? (
        <div className={styles.message}>😿 No symptoms added yet.</div>
      ) : (
        <div className={styles.symptomList}>
          {symptoms.map((symptom) => (
            <SymptomCard
              key={symptom._id}
              symptom={symptom}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Symptoms;

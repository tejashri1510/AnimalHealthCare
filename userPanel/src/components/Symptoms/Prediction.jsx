import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Prediction.module.css';

const Prediction = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [prediction, setPrediction] = useState('');
  const [precaution, setPrecaution] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSymptoms = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/symptoms`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setSymptoms(response.data);
      } catch (err) {
        console.error('Failed to load symptoms:', err);
        setError('Failed to load symptoms');
      }
    };
    fetchSymptoms();
  }, []);

  const handleChange = (event) => {
    const symptom = event.target.value;
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSymptoms.length === 0) {
      setError('Please select at least one symptom');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_PREDICT_URL}/predict`,
        { symptoms: selectedSymptoms },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setPrediction(response.data.disease);
      setPrecaution(response.data.precautions);
      setError('');
    } catch (err) {
      console.error('Prediction failed:', err);
      setError('Prediction failed. Try again.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🐾 Animal Disease Predictor</h2>
      <p className={styles.subtitle}>Select the symptoms and predict the disease</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.symptomGrid}>
          {symptoms.map((symptom) => (
            <label key={symptom._id} className={styles.symptomItem}>
              <input
                type="checkbox"
                value={symptom.name}
                onChange={handleChange}
              />
              {symptom.name}
            </label>
          ))}
        </div>

 <div className={styles.buttonWrapper}>
          <button type="submit" className={styles.predictBtn}>
            🔍 Predict
          </button>
        </div>      </form>

      {prediction && (
        <div className={styles.resultBox}>
          <h3>🦠 Predicted Disease:</h3>
          <p><strong>{prediction}</strong></p>
          <h4>💊 Suggested Precaution:</h4>
          <p>{precaution}</p>
        </div>
      )}

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Prediction;

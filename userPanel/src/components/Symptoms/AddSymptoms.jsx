import React, { useState } from 'react';
import styles from './AddSymptoms.module.css';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

const AddSymptoms = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/symptoms', { name, description });
      console.log('Symptom added:', response.data);
      setName('');
      setDescription('');
      navigate('/viewsymptom');
    } catch (error) {
      console.error('Error adding symptom:', error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>➕ Add New Symptom</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Symptom Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="e.g., Coughing"
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Describe the symptom"
          />
        </label>
        <div className={styles.buttonWrapper}>
          <button type="submit" className={styles.submitBtn}>Add Symptom</button>
        </div>
      </form>
    </div>
  );
};

export default AddSymptoms;

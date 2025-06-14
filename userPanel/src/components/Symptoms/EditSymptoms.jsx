import React, { useState, useEffect } from 'react';
import styles from './EditSymptoms.module.css';
import api from '../../api';
import { useParams, useNavigate } from 'react-router-dom';

const EditSymptoms = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSymptom = async () => {
      try {
        const response = await api.get('/symptoms');
        const symptom = response.data.find((sym) => sym._id === id);
        if (symptom) {
          setName(symptom.name);
          setDescription(symptom.description);
        } else {
          alert('Symptom not found');
        }
      } catch (error) {
        console.error('Error fetching symptom:', error);
        alert('Failed to load symptom.');
      } finally {
        setLoading(false);
      }
    };

    fetchSymptom();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(`/symptoms/${id}`, {
        name,
        description,
      });

      console.log('Symptom updated:', response.data);
      alert('Symptom updated successfully!');
      navigate('/viewsymptom');
    } catch (error) {
      console.error('Error updating symptom:', error.response?.data || error.message);
      alert('Failed to update symptom.');
    }
  };

  if (loading) return <p className={styles.loading}>⏳ Loading...</p>;

  return (
    <div className={styles.container} id="editsymptom">
      <h2 className={styles.title}>✏️ Edit Symptom</h2>
      <form className={styles.form} onSubmit={handleUpdate}>
        <label>
          Name:
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter symptom name"
            required
          />
        </label>
        <label>
          Description:
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
        </label>
        <div className={styles.buttonContainer}>
          <button className={styles.submitBtn} type="submit">
            ✅ Update Symptom
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSymptoms;

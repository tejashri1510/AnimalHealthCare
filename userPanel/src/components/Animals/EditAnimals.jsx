import React, { useState, useEffect } from 'react';
import styles from './EditAnimals.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';

const EditAnimal = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState({
    name: '',
    species: '',
    age: ''
  });

  useEffect(() => {
    console.log("Animal ID from URL:", id);
    api.get(`/animals/${id}`)
      .then(res => {
        setAnimal(res.data || {}); // Fallback in case API returns null
      })
      .catch(err => {
        console.error('Error fetching animal:', err);
        alert('Animal not found or server error.');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimal(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/animals/${id}`, animal); // ✅ FIXED HERE
      alert('Animal updated successfully!');
      navigate('/view-animal');
    } catch (error) {
      console.error('Error updating animal:', error);
      alert('Failed to update animal.');
    }
  };

  return (
    <div className={styles.container} id='edit-animal'>
      <h2 className={styles.heading}>Edit Animal</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={animal.name || ''} // ✅ Prevent uncontrolled warning
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Species:
          <input
            type="text"
            name="species"
            value={animal.species || ''}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={animal.age || ''}
            onChange={handleChange}
            min="0"
            required
          />
        </label>
        <button type="submit" className={styles.submitBtn}>Save Changes</button>
      </form>
    </div>
  );
};

export default EditAnimal;

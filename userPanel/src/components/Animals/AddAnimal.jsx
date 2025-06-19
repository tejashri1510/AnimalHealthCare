import React, { useState } from 'react';
import styles from './AddAnimal.module.css';
import api from '../../api'; // Adjust path as needed

const AddAnimal = ({ onAnimalAdded }) => {
  const [animal, setAnimal] = useState({
    name: '',
    species: '',
    age: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimal(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // ✅ Get JWT token
      if (!token) {
        alert('You must be logged in to add an animal.');
        return;
      }

      // ✅ Send token in Authorization header
      await api.post('/animals', animal, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert('Animal added successfully');
      setAnimal({ name: '', species: '', age: '' });
      if (onAnimalAdded) onAnimalAdded(); // Call callback if provided
    } catch (err) {
      console.error('Error adding animal:', err);
      alert('Failed to add animal. Please check your credentials or try again.');
    }
  };

  return (
    <div className={styles.container} id='add-animal'>
      <h2 className={styles.heading}>Add Animal</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Name:
          <input type="text" name="name" value={animal.name} onChange={handleChange} required />
        </label>
        <label>
          Species:
          <input type="text" name="species" value={animal.species} onChange={handleChange} required />
        </label>
        <label>
          Age:
          <input type="number" name="age" value={animal.age} onChange={handleChange} min="0" required />
        </label>
        <button type="submit" className={styles.submitBtn}>Add Animal</button>
      </form>
    </div>
  );
};

export default AddAnimal;

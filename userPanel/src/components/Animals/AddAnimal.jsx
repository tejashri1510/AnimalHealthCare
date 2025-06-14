import React, { useState } from 'react';
import styles from './AddAnimal.module.css';
import api from '../../api'; // adjust path as needed

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
    await api.post('/animals', animal);
    alert('Animal added successfully');
    setAnimal({ name: '', species: '', age: '' });
  } catch (err) {
    console.error('Error adding animal:', err);
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

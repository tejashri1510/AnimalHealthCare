import React, { useEffect, useState } from 'react';
import AnimalCard from './AnimalCard';
import styles from './AnimalView.module.css';
import api from '../../api'; // Make sure path is correct

const AnimalView = () => {
  const [animals, setAnimals] = useState([]);
useEffect(() => {
  api.get('/animals') // ✅ must match backend route
    .then(res => setAnimals(res.data))
    .catch(err => console.error('Error fetching animals:', err));
}, []);

  const fetchAnimals = async () => {
    try {
      const res = await api.get('/animals');
      setAnimals(res.data);
    } catch (err) {
      console.error('Error fetching animals:', err);
    }
  };

  
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this animal?')) {
      try {
        await api.delete(`/animals/${id}`);
        setAnimals(prev => prev.filter(animal => animal._id !== id)); // Remove from UI
      } catch (err) {
        console.error('Error deleting animal:', err);
        alert('Failed to delete animal.');
      }
    }
  };

  return (
    <div className={styles.container} id='view-animal'>
      <h2 className={styles.heading}>Your Animals</h2>
      <div className={styles.cardsContainer}>
        {animals.length === 0 ? (
          <p className={styles.emptyText}>No animals added yet.</p>
        ) : (
          animals.map(animal => (
            <AnimalCard key={animal._id} animal={animal}  onDelete={handleDelete}/>
          ))
        )}
      </div>
    </div>
  );
};

export default AnimalView;

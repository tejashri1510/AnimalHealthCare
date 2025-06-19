import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Animals.module.css';
import api from '../../api'; // adjust path

function Animals() {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState([]);
  
  useEffect(() => {
    api.get('/animals')
      .then(res => setAnimals(res.data))
      .catch(err => {
        console.error('Error fetching animals:', err);
        alert('Failed to fetch animals.');
      });
  }, []);

  return (
    <div className={styles.container} id='animal'>
      <h2 className={styles.heading}>Animal Management</h2>
      <div className={styles.buttonGroup}>
        <button onClick={() => navigate('/add-animal')} className={styles.button}>Add Animal</button>
        <button onClick={() => navigate('/view-animal')} className={styles.button}>View Animals</button>
      </div>

      {/* Show each animal with Edit button */}
      <div className={styles.animalList}>
        {animals.map((animal) => (
          <div key={animal._id} className={styles.animalCard}>
            <p><strong>Name:</strong> {animal.name}</p>
            <p><strong>Species:</strong> {animal.species}</p>
            <p><strong>Age:</strong> {animal.age}</p>
            <button onClick={() => navigate(`/edit-animal/${animal._id}`)} className={styles.editBtn}>
              Edit
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Animals;

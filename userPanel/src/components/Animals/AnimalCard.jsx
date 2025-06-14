import React from 'react';
import styles from './AnimalCard.module.css';

const AnimalCard = ({ animal, onDelete }) => {
  return (
    <div className={styles.card}>
      {/* Image at the top */}
      {animal.imageUrl && (
        <img src={animal.imageUrl} alt={animal.name} className={styles.image} />
      )}

      {/* Animal Info */}
      <h3 className={styles.name}>{animal.name}</h3>
      <p className={styles.para}><strong>Species:</strong> {animal.species}</p>
      <p className={styles.para}><strong>Age:</strong> {animal.age}</p>

      {/* Delete Button */}
      <button onClick={() => onDelete(animal._id)}  className={styles.deleteBtn} >
        Delete
      </button>
    </div>
  );
};

export default AnimalCard;

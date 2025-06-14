import React from 'react';
import styles from './SymtomCard.module.css';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import api from '../../api';

const SymtomCard = ({ symptom, onDelete }) => {
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/editsymptom/${symptom._id}`);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this symptom?')) {
      try {
        await api.delete(`/symptoms/${symptom._id}`);
        onDelete(symptom._id);
      } catch (err) {
        console.error('Error deleting symptom:', err);
        alert('Failed to delete symptom');
      }
    }
  };

  return (
    <div className={styles.card} id='symptomcard'>
      <div className={styles.header}>
        <h3 className={styles.name}>{symptom.name}</h3>
      </div>
      <p className={styles.description}>{symptom.description}</p>
      <div className={styles.actions}>
        <button onClick={handleEdit} className={styles.editBtn}>
          <FaEdit /> Edit
        </button>
        <button onClick={handleDelete} className={styles.deleteBtn}>
          <FaTrash /> Delete
        </button>
      </div>
    </div>
  );
};

export default SymtomCard;

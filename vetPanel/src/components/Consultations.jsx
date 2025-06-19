import React, { useEffect, useState } from 'react';
import api from '../api';
import styles from './Consultations.module.css';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Consultations = () => {
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const res = await api.get('/consultation/vet/all');
        setConsultations(res.data);
      } catch (error) {
        console.error('Error fetching consultations:', error);
      }
    };

    fetchConsultations();
  }, []);

  const handleReply = async (id) => {
    const answer = prompt('Enter your reply:');
    if (!answer) return;

    try {
      await api.put(`/consultation/reply/${id}`, { answer });
      alert('Reply sent!');
      const res = await api.get('/consultation/vet/all');
      setConsultations(res.data);
    } catch (err) {
      console.error('Error sending reply:', err);
      alert('Failed to send reply.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Vet Consultations</h2>
      {consultations.length === 0 ? (
        <p className={styles.emptyMessage}>No consultation questions yet.</p>
      ) : (
        consultations.map((c) => (
          <div key={c._id} className={styles.consultationCard}>
            <div className={styles.avatar}>
              {c.userId?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className={styles.details}>
              <p className={styles.timestamp}>
                Asked on: {formatDate(c.createdAt || c.updatedAt || Date.now())}
              </p>
              <p><strong>User ID:</strong> {c.user}</p>
              <p><strong>Question:</strong> {c.question}</p>
              {c.answer ? (
                <div className={styles.reply}>
                  <strong>Vet Reply:</strong>
                  <p>{c.answer}</p>
                </div>
              ) : (
                <button
                  className={styles.replyButton}
                  onClick={() => handleReply(c._id)}
                >
                  Reply
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Consultations;
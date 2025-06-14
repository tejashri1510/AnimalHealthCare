import React, { useEffect, useState } from 'react';
import styles from './VetReplies.module.css';
import api from '../../api';

const VetReplies = () => {
  const [replies, setReplies] = useState([]);

  const fetchReplies = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const response = await api.get(`/consultation/user/${userId}`);
      setReplies(response.data);
    } catch (error) {
      console.error('Error fetching replies:', error);
    }
  };

  useEffect(() => {
    fetchReplies();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Vet Replies</h2>
      {replies.length === 0 ? (
        <p>No replies yet.</p>
      ) : (
        replies.map((reply, index) => (
          <div key={index} className={styles.replyCard}>
            <p><strong>Question:</strong> {reply.question}</p>
            <p><strong>Reply:</strong> {reply.answer || "Pending..."}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default VetReplies;

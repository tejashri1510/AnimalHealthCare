import React, { useState } from 'react';
import styles from './AskQuestion.module.css';
import api from '../../api';

const AskQuestion = ({ onSubmit }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    if (!question.trim()) return;

    try {
      await api.post('/consultation/ask', { userId, question });
      setQuestion('');
      onSubmit(); // refresh replies
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Ask a Vet</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question..."
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AskQuestion;

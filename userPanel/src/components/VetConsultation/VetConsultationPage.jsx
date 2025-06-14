import React from 'react';
import AskQuestion from './AskQuestion';
import VetReplies from './VetReplies';
import styles from './VetConsultationPage.module.css';
import { MessageCircle, Inbox } from 'lucide-react';

const VetConsultationPage = () => {
  const [refresh, setRefresh] = React.useState(false);

  const handleNewQuestion = () => {
    setRefresh(!refresh);
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.header}>
        <MessageCircle className={styles.icon} />
        Ask a Vet
      </h1>

      <div className={styles.sections}>
        <div className={styles.askBox}>
          <h2 className={styles.subheading}>Have a question about your pet?</h2>
          <AskQuestion onSubmit={handleNewQuestion} />
        </div>

        <div className={styles.repliesBox}>
          <h2 className={styles.subheading}>
            <Inbox className={styles.iconSmall} />
            Your Previous Consultations
          </h2>
          <VetReplies key={refresh} />
        </div>
      </div>
    </div>
  );
};

export default VetConsultationPage;

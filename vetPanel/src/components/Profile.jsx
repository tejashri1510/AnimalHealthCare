import React from 'react';
import styles from './Profile.module.css';

const Profile = () => {
  // Dummy vet data
  const vet = {
    name: "Dr. Priya Sharma",
    email: "priya.sharma@example.com",
    specialization: "Veterinary Surgery",
    phone: "+91 9876543210",
    experience: "7 years",
    clinic: "GreenCare Animal Clinic",
    location: "Pune, Maharashtra",
    avatar: "https://i.pravatar.cc/150?img=13" // Use a random avatar
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={vet.avatar} alt="Vet Avatar" className={styles.avatar} />
        <h2 className={styles.name}>{vet.name}</h2>
        <p className={styles.specialization}>{vet.specialization}</p>

        <div className={styles.details}>
          <p><strong>Email:</strong> {vet.email}</p>
          <p><strong>Phone:</strong> {vet.phone}</p>
          <p><strong>Experience:</strong> {vet.experience}</p>
          <p><strong>Clinic:</strong> {vet.clinic}</p>
          <p><strong>Location:</strong> {vet.location}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

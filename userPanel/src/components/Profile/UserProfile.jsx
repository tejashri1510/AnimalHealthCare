import React, { useState } from 'react';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "Tejashri Shirsath",
    email: "tejashri@example.com",
    phone: "+91 9876543210",
    city: "Nashik, Maharashtra",
    joined: "January 2024",
    petsOwned: 3,
    avatar: "https://i.pravatar.cc/150?img=32"
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...formData });
    setEditMode(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={user.avatar} alt="User Avatar" className={styles.avatar} />
        <h2 className={styles.name}>{user.name}</h2>
        <p className={styles.subheading}>Pet Owner</p>

        {editMode ? (
          <form onSubmit={handleSubmit} className={styles.editForm}>
            <label>
              Name:
              <input name="name" value={formData.name} onChange={handleChange} required />
            </label>
            <label>
              Email:
              <input name="email" value={formData.email} onChange={handleChange} required />
            </label>
            <label>
              Phone:
              <input name="phone" value={formData.phone} onChange={handleChange} required />
            </label>
            <label>
              City:
              <input name="city" value={formData.city} onChange={handleChange} required />
            </label>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.saveBtn}>Save</button>
              <button type="button" onClick={() => setEditMode(false)} className={styles.cancelBtn}>Cancel</button>
            </div>
          </form>
        ) : (
          <div className={styles.details}>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone}</p>
            <p><strong>City:</strong> {user.city}</p>
            <p><strong>Pets Owned:</strong> {user.petsOwned}</p>
            <p><strong>Joined:</strong> {user.joined}</p>
            <button className={styles.editBtn} onClick={() => setEditMode(true)}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;

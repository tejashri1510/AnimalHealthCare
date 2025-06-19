// src/components/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import api from '../api'; // Axios instance with token in header

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/user/profile'); // ✅ Make sure route is protected
        setUser(res.data);
        setFormData(res.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/user/profile', formData);
      setUser(res.data); // Backend should return updated user
      setEditMode(false);
      alert('Profile updated successfully!');
    } catch (err) {
      console.error('Update failed:', err.response?.data || err.message);
      alert('Error updating profile');
    }
  };

  if (!user) return <p>Loading profile...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
     {user.avatar ? (
  <img
    src={user.avatar}
    alt="User Avatar"
    className={styles.avatar}
  />
) : (
  <div className={styles.initialsAvatar}>
    {user.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
  </div>
)}


        <h2 className={styles.name}>{user.name}</h2>
        <p className={styles.subheading}>{user.role === 'vet' ? 'Veterinarian' : 'Pet Owner'}</p>

        {editMode ? (
          <form onSubmit={handleSubmit} className={styles.editForm}>
            <label>Name:<input name="name" value={formData.name} onChange={handleChange} required /></label>
            <label>Email:<input name="email" value={formData.email} onChange={handleChange} required /></label>
            <label>Phone:<input name="phone" value={formData.phone || ''} onChange={handleChange} /></label>
            <label>Location:<input name="location" value={formData.location || ''} onChange={handleChange} /></label>
            <label>Avatar URL:<input name="avatar" value={formData.avatar || ''} onChange={handleChange} /></label>

            {user.role === 'vet' && (
              <>
                <label>Specialization:<input name="specialization" value={formData.specialization || ''} onChange={handleChange} /></label>
                <label>Clinic:<input name="clinic" value={formData.clinic || ''} onChange={handleChange} /></label>
                <label>Experience:<input name="experience" value={formData.experience || ''} onChange={handleChange} /></label>
              </>
            )}

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.saveBtn}>Save</button>
              <button type="button" onClick={() => setEditMode(false)} className={styles.cancelBtn}>Cancel</button>
            </div>
          </form>
        ) : (
          <div className={styles.details}>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Phone:</strong> {user.phone || '—'}</p>
            <p><strong>Location:</strong> {user.location || '—'}</p>
            <p><strong>Joined:</strong> {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}</p>
             <p><strong>Role:</strong> {user.role}</p>

            {user.role === 'vet' && (
              <>
                <p><strong>Specialization:</strong> {user.specialization || '—'}</p>
                <p><strong>Clinic:</strong> {user.clinic || '—'}</p>
                <p><strong>Experience:</strong> {user.experience || '—'}</p>
              </>
            )}

            <button className={styles.editBtn} onClick={() => setEditMode(true)}>Edit Profile</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

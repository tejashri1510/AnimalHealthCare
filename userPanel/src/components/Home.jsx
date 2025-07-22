import React from 'react';
import styles from './Home.module.css';
import homepage3DImage from '../assets/home3d.png'; 

const Home = () => {
  return (
    <div className={styles.homepageContainer} id="home">
      <div className={styles.homepageContent}>
        <h1>Welcome to PraniSakha</h1>
        <p>
          Your trusted companion for animal healthcare in rural areas.
          We help you manage animal records, book vet appointments, and stay updated with essential care tips.
        </p>
        <button className={styles.homepageButton}>Explore Services</button>
      </div>
      <div className={styles.homepageImage}>
        <img src={homepage3DImage} alt="Animal Health 3D" />
      </div>
    </div>
  );
};

export default Home;

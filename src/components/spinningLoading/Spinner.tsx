// components/Spinner.tsx
import React from 'react';
import styles from './Spinner.module.css'; // We'll create a CSS module

const Spinner: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}></div>
      <p className={styles.text}>Loading...</p>
    </div>
  );
};

export default Spinner;

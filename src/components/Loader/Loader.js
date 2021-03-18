import React from 'react';
import styles from './Loader.module.css';

const Loader = () => (
  <div className={styles.loader}>
    <div className={[styles.inner, styles.one].join(' ')}></div>
    <div className={[styles.inner, styles.two].join(' ')}></div>
    <div className={[styles.inner, styles.three].join(' ')}></div>
  </div>
);

export default Loader;

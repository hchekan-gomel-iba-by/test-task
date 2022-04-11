import React from 'react';
import styles from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.error}>
      <p>Page not found!</p>
    </div>
  );
};

export default NotFound;

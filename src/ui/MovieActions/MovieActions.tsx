import React from 'react';
import styles from './MovieActions.module.css';

export const MovieActions: React.FC = ({ children }) => {
  return (
    <div className={styles.container}>{children}</div>
  );
};

export default MovieActions;

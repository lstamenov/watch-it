import React from 'react';
import { Typography } from '@mui/material';
import styles from './NotFound.module.css';

const NotFound: React.FC = () => (
  <div className={styles.wrapper}>
    <Typography className={styles.title} variant="h1">
      404
    </Typography>
    <Typography
      className={styles.title}
      style={{ fontWeight: '500' }}
      variant="h2"
    >
      Page not found
    </Typography>
  </div>
);

export default NotFound;

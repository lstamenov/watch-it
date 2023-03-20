import { Grid } from '@mui/material';
import React from 'react';
import styles from './CastLayout.module.css';

export const CastLayout: React.FC = ({ children }) => {
  return (
    <Grid className={styles.container} container spacing={2} columnSpacing={4}>
      {children}
    </Grid>
  );
};

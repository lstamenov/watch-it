import React from 'react';
import { Grid } from '@mui/material';
import styles from './ResultsLayout.module.css';

const ResultsLayout: React.FC = ({ children }) => {
  return (
    <Grid className={styles.container} container spacing={2}>
        {children}
    </Grid>
  );
};

export default ResultsLayout;
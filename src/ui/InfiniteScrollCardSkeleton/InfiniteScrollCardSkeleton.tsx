import React from 'react';
import Grid from '@mui/material/Grid';
import styles from './InfiniteScrollCardSkeleton.module.css';

const InfiniteScrollCardSkeleton: React.FC = () => {
  return (
    <Grid item xs={6} sm={4}>
      <div className={styles.card} />
    </Grid>
  );
};

export default InfiniteScrollCardSkeleton;

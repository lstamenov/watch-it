import React from 'react';
import { Typography } from '@mui/material';
import styles from './NoResults.module.css';

const NoResults: React.FC = () => (
  <div>
    <Typography className={styles.title} variant="h4">Oops.</Typography>
    <Typography className={styles.title} variant="h5">
      It looks like there are no results matching your search
    </Typography>
  </div>
);

export default NoResults;

import React from 'react';
import { Typography } from '@mui/material';
import styles from './OverviewDetail.module.css';

interface Props {
  key: string;
  value: string;
}

const OverviewDetaill: React.FC<Props> = ({ key, value }) => (
  <div className={styles.container}>
    <Typography variant='body1'>{key}:</Typography>
    <Typography variant='body1'>{value}</Typography>
  </div>
);

export default OverviewDetaill;
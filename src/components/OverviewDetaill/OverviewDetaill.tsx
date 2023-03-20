import React from 'react';
import { Typography } from '@mui/material';
import styles from './OverviewDetail.module.css';

interface Props {
  field: string;
  value: string;
}

const OverviewDetaill: React.FC<Props> = ({ field, value }) => (
  <div className={styles.container}>
    <Typography className={styles.field} variant="subtitle1">
      {field}:
    </Typography>
    <Typography className={styles.field} variant="subtitle1">
      {value}
    </Typography>
  </div>
);

export default OverviewDetaill;

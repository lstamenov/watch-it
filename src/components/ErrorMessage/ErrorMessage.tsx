import React from 'react';
import { Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import styles from './ErrorMessage.module.css';

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => (
  <div className={styles.container}>
    <ErrorOutlineIcon fontSize="small" className={styles.color} />
    <Typography className={styles.color} variant="body1">
      {message}
    </Typography>
  </div>
);

export default ErrorMessage;

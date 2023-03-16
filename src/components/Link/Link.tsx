import { Typography } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styles from './Link.module.css';

interface Props {
  url: string;
  text: string;
}

const Link: React.FC<Props> = ({ url, text }) => (
  <RouterLink className={styles.wrapper} to={url}>
    <Typography className={styles.link} variant="body1">
      {text}
    </Typography>
  </RouterLink>
);

export default Link;

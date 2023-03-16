import React from 'react';
import { Container, Typography } from '@mui/material';

import styles from './InfoText.module.css';

interface Props {
  text: string;
}

const InfoText: React.FC<Props> = ({ text }) => {
  return (
    <Container className={styles.info}>
      <Typography textAlign="center" gutterBottom color="white" variant="h6">
        {text}
      </Typography>
    </Container>
  );
};

export default InfoText;

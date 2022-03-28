import React from 'react';
import { Container, Grid, StyledEngineProvider } from '@mui/material';
import styles from './GenresLayout.module.css';

const GenresLayout: React.FC = ({ children }) => {
  return (
    <StyledEngineProvider injectFirst>
      <Container maxWidth='md'>
        <Grid container columnSpacing={2} className={styles.container}> 
          {children}
        </Grid>
      </Container>
    </StyledEngineProvider>
  );
};

export default GenresLayout;
import React from 'react';
import { Grid } from '@mui/material';

const ResultsLayout: React.FC = ({ children }) => {
  return (
    <Grid container spacing={2}>
        {children}
    </Grid>
  );
};

export default ResultsLayout;
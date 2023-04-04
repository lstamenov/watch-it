import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

export const AnimatedPage: React.FC<{ isLoading: boolean }> = ({ children, isLoading }) => {
  return (
    <>
      <Backdrop sx={{ zIndex: 99999999 }} open={isLoading}>
        <CircularProgress size={90} sx={{ color: '#b45177' }} />
      </Backdrop>
      {children}
    </>
  );
};

export default AnimatedPage;

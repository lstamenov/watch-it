import React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { selectLoader } from '../../store/loader/selectors';

export const AnimatedPage: React.FC = ({ children }) => {
  const isLoading = useAppSelector(selectLoader);

  return (
    <>
      <Backdrop sx={{ zIndex: 999999 }} open={isLoading}>
        <CircularProgress size={90} sx={{ color: '#b45177' }} />
      </Backdrop>
      {children}
    </>
  );
};

export default AnimatedPage;

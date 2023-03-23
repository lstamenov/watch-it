import React from 'react';
import { motion } from 'framer-motion';
import { Backdrop, CircularProgress } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { selectLoader } from '../../store/loader/selectors';

export const AnimatedPage: React.FC = ({ children }) => {
  const isLoading = useAppSelector(selectLoader);

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
    >
      <Backdrop sx={{ zIndex: 999999 }} open={isLoading}>
        <CircularProgress size={90} sx={{ color: '#b45177' }} />
      </Backdrop>
      {children}
    </motion.div>
  );
};

export default AnimatedPage;

import React from 'react';
import { motion } from 'framer-motion';

export const AnimatedPage: React.FC = ({ children }) => {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;

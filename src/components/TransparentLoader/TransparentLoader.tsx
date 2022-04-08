import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import useMobile from '../../hooks/useMobile';

const TransparentLoader: React.FC = () => {
  const isMobile = useMobile();
  
  return (
    <div style={isMobile ? { position: 'absolute', top: '50%', left: '30%' } : { position: 'absolute', top: '70%', left: '3%' }}>
      <RotatingLines width='180' strokeColor='#AA7489' animationDuration='1.5'/>
    </div>
  );
};

export default TransparentLoader;
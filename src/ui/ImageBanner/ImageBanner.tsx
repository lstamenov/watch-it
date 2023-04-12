import React from 'react';
import styles from './ImageBanner.module.css';

interface Props {
  img: string;
}

const ImageBanner: React.FC<Props> = ({ img, children }) => {
  return (
    <div className={styles.banner} style={{ backgroundImage: `url(${img})` }}>
      {children}
    </div>
  );
};

export default ImageBanner;

import { Divider } from '@mui/material';
import React from 'react';
import styles from './PosterLayout.module.css';

interface Props {
  image: string;
}

const PosterLayout: React.FC<Props> = ({ image, children }) => (
  <div className={styles.container}>
    <img className={styles.img} src={image} alt="poster" />
    {children}
    <Divider />
  </div>
);

export default PosterLayout;

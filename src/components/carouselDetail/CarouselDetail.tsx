import { Typography } from '@mui/material';
import React from 'react';
import styles from './CarouselDetail.module.css';
import { CarouseDetailProps } from './types';

const CarouselDetail: React.FC<CarouseDetailProps> = ({ value }) => (
  <Typography className={styles.lang}>{value}</Typography>
);

export default CarouselDetail;

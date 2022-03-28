import React from 'react';
import styles from './CarouselDetail.module.css';
import { CarouseDetailProps } from './types';

const CarouselDetail: React.FC<CarouseDetailProps> = ({ value }) => <span className={styles.lang}>{value}</span>;

export default CarouselDetail;
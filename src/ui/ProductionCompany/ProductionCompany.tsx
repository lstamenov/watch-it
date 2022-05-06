import { Card } from '@mui/material';
import React from 'react';
import { ProdcutionCompany } from '../../types/types';
import { getMoviePosterPath } from '../../utils/movieUtils';
import styles from './ProductionCompany.module.css';

interface Props {
  company: ProdcutionCompany;
}

export const ProductionCompany: React.FC<Props> = ({ company }) => {
  return company.logo_path ? (
    <Card elevation={4} className={styles.card}>
      <img className={styles.img} src={getMoviePosterPath(company.logo_path)} />
    </Card>
  ) : null;
};

export default ProductionCompany;
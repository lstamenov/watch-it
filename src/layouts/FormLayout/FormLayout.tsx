import { Typography } from '@mui/material';
import React from 'react';
import photo from '../../assets/auth-img.png';
import styles from './FormLayout.module.css';

interface Props {
  title: 'sign in' | 'sign up';
}

const FormLayout: React.FC<Props> = ({ children, title }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Typography className={styles.title} variant='h4'>{title}</Typography>
        {children}
      </div>
      <img src={photo} className={styles.img} alt='preview' />
    </div>
  );
};

export default FormLayout;
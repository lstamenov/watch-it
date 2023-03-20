import React from 'react';
import { Typography } from '@mui/material';
import styles from './NotFound.module.css';
import { useTranslation } from 'react-i18next';

const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.wrapper}>
      <Typography className={styles.title} variant="h1">
        404
      </Typography>
      <Typography className={styles.title} style={{ fontWeight: '500' }} variant="h2">
        {t('NOT_FOUND')}
      </Typography>
    </div>
  );
};

export default NotFound;

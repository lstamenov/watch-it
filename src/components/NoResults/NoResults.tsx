import React from 'react';
import { Typography } from '@mui/material';
import styles from './NoResults.module.css';
import { useTranslation } from 'react-i18next';

const NoResults: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Typography className={styles.title} variant="h4">
        {t('OOPS')}
      </Typography>
      <Typography className={styles.title} variant="h5">
        {t('NO_RESULTS')}
      </Typography>
    </div>
  );
};

export default NoResults;

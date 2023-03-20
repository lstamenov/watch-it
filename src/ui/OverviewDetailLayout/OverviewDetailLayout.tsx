import React from 'react';
import { Typography } from '@mui/material';
import styles from './OverviewDetailLayout.module.css';

interface Props {
  title: string;
}

export const OverviewDetailLayout: React.FC<Props> = ({ title, children }) => {
  return (
    <>
      <Typography
        className={styles.title}
        textAlign="center"
        color="white"
        variant="h4"
        gutterBottom
        textTransform="uppercase"
      >
        {title}
      </Typography>
      <div className={styles.container}>{children}</div>
    </>
  );
};

export default OverviewDetailLayout;

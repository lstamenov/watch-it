/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import Button from '@mui/material/Button/Button';
import styles from './WatchNowButton.module.css';
import Typography from '@mui/material/Typography/Typography';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
  watchURL: string;
  className?: string;
}

const WatchNowButton: React.FC<Props> = ({ watchURL, className }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const onClick = () => navigate(watchURL);

  return (
    <Button onClick={onClick} className={`${styles.button} ${className}`}>
      <Typography variant="h6">{t('WATCH_NOW')}</Typography>
      <PlayArrowRoundedIcon className={styles.icon} />
    </Button>
  );
};

export default WatchNowButton;

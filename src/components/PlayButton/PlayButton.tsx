import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './PlayButton.module.css';
import { Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
  url: string;
  size?: number;
  isTransparent?: boolean;
}

const PlayButton: React.FC<Props> = ({ url, size, isTransparent = false }) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t('PLAY') || ''}>
      <Link to={url}>
        <FontAwesomeIcon
          style={{ fontSize: `${size}px` }}
          className={`${styles.icon} ${isTransparent && styles.transparent}`}
          icon={faPlay}
        />
      </Link>
    </Tooltip>
  );
};

export default PlayButton;

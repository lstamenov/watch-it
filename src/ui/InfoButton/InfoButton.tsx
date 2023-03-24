import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import styles from './InfoButton.module.css';

interface Props {
  onClick?: () => void;
}

const InfoButton: React.FC<Props> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t('VIEW_MORE') || ''}>
      <IconButton onClick={onClick}>
        <InfoOutlinedIcon className={styles.icon} />
      </IconButton>
    </Tooltip>
  );
};

export default InfoButton;

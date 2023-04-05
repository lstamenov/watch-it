import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import styles from './InfoButton.module.css';

interface Props {
  onClick?: () => void;
  className?: string;
  isTransparent?: boolean;
}

const InfoButton: React.FC<Props> = ({ onClick, className, isTransparent = false }) => {
  const { t } = useTranslation();

  return (
    <Tooltip className={className} title={t('VIEW_MORE') || ''}>
      <IconButton onClick={onClick}>
        <InfoOutlinedIcon
          sx={{
            opacity: isTransparent ? '0.65' : '1',
          }}
          className={styles.icon}
        />
      </IconButton>
    </Tooltip>
  );
};

export default InfoButton;

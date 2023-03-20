import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@mui/material';
import styles from './AddToListButton.module.css';
import { useTranslation } from 'react-i18next';

interface Props {
  onClick: () => void;
  size?: number;
  isOnProfile?: boolean;
  isMovieAddedToList?: boolean;
  hasMargin?: boolean;
  isEnabled?: boolean;
}

const AddToListButton: React.FC<Props> = ({
  onClick,
  size,
  hasMargin = false,
  isOnProfile = false,
  isMovieAddedToList = false,
  isEnabled = false,
}) => {
  const { t } = useTranslation();

  return isEnabled ? (
    <>
      <Tooltip title={isOnProfile ? t('REMOVE_FROM_LIST') || '' : t('ADD_TO_LIST') || ''}>
        <div>
          <FontAwesomeIcon
            onClick={onClick}
            style={{ fontSize: `${size}px`, marginLeft: hasMargin ? '5px' : '0px' }}
            className={isMovieAddedToList ? styles.added : styles.icon}
            icon={isOnProfile ? faMinus : faPlus}
          />
        </div>
      </Tooltip>
    </>
  ) : null;
};

export default AddToListButton;

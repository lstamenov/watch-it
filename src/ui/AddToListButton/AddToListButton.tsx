import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@mui/material';
import styles from './AddToListButton.module.css';
// import { Link } from 'react-router-dom';

interface Props {
  onClick: () => void;
  size?: number;
  isOnProfile?: boolean;
  isMovieAddedToList?: boolean;
  hasMargin?: boolean;
}

const AddToListButton: React.FC<Props> = ({
  onClick,
  size,
  hasMargin = false,
  isOnProfile = false,
  isMovieAddedToList = false,
}) => (
  <>
    <Tooltip
      title={isOnProfile ? 'Remove from list' : 'Add to list'}
    >
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
);

export default AddToListButton;

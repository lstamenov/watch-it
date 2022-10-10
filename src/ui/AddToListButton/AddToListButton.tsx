import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@mui/material';
import styles from './AddToListButton.module.css';
import { Link } from 'react-router-dom';

interface Props {
  onClick: () => void;
  size?: number;
  isOnProfile?: boolean;
}

const AddToListButton: React.FC<Props> = ({
  onClick,
  size,
  isOnProfile = false,
}) => (
  <>
    <Tooltip placement="bottom" title={isOnProfile ? 'Remove from list' : 'Add to list'}>
      <Link to={''}>
        <FontAwesomeIcon
          onClick={onClick}
          style={{ fontSize: `${size}px` }}
          className={styles.icon}
          icon={isOnProfile ? faMinus : faPlus}
        />
      </Link>
    </Tooltip>
  </>
);

export default AddToListButton;

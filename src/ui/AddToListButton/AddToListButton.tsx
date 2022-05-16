import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Tooltip } from '@mui/material';
import styles from './AddToListButton.module.css';
import { Link } from 'react-router-dom';

interface Props {
  onClick: () => void;
  size?: number;
}

const AddToListButton: React.FC<Props> = ({ onClick, size }) => (
  <>
    <Tooltip placement='bottom' title='Add to list'>
      <Link to={''}>
        <FontAwesomeIcon onClick={onClick} style={{ fontSize: `${size}px` }} className={styles.icon} icon={faPlus} />
      </Link>
    </Tooltip>
    
  </>
);

export default AddToListButton;
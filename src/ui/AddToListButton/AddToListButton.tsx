import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Alert, Snackbar, Tooltip } from '@mui/material';
import styles from './AddToListButton.module.css';
import { Link } from 'react-router-dom';

interface Props {
  onClick: () => void;
  movieTitle: string;
  shouldShowMessage: boolean;
  onMessageClosed: () => void;
  size?: number;
}

const AddToListButton: React.FC<Props> = ({ onClick, size, movieTitle, shouldShowMessage, onMessageClosed }) => (
  <>
    <Tooltip placement='bottom' title='Add to list'>
      <Link to={''}>
        <FontAwesomeIcon onClick={onClick} style={{ fontSize: `${size}px` }} className={styles.icon} icon={faPlus} />
      </Link>
    </Tooltip>
    <Snackbar open={shouldShowMessage} autoHideDuration={3000} onClose={onMessageClosed}>
      <Alert onClose={onMessageClosed}>
        Successfully added {movieTitle} to your list
      </Alert>
    </Snackbar>
  </>
);

export default AddToListButton;
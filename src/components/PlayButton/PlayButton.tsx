import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './PlayButton.module.css';
import { Tooltip } from '@mui/material';

interface Props {
  url: string;
  size?: number;
}

const PlayButton: React.FC<Props> = ({ url, size }) => (
  <Tooltip title='Play'>
    <Link to={url}>
      <FontAwesomeIcon style={{ fontSize: `${size}px` }} className={styles.icon} icon={faPlay} />
    </Link>
  </Tooltip>
);

export default PlayButton;
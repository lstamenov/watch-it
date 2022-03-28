import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './PlayButton.module.css';

interface Props {
  url: string;
}

const PlayButton: React.FC<Props> = ({ url }) => (
  <Link to={url}>
        <FontAwesomeIcon className={styles.icon} icon={faPlay} />
  </Link>
);

export default PlayButton;
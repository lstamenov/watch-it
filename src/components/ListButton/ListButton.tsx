import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ListButton.module.css';

interface Props {
  url: string;
}

const ListButton: React.FC<Props> = ({ url }) => (
  <Link to={url}>
    <FontAwesomeIcon className={styles.icon} icon={faListUl} />
  </Link>
);

export default ListButton;
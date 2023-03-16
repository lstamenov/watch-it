import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Tooltip } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ListButton.module.css';

interface Props {
  url: string;
}

const ListButton: React.FC<Props> = ({ url }) => (
  <Tooltip title="View more">
    <Link to={url}>
      <FontAwesomeIcon className={styles.icon} icon={faListUl} />
    </Link>
  </Tooltip>
);

export default ListButton;

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faListUl } from '@fortawesome/free-solid-svg-icons';
import { CardActions } from '@mui/material';
import { Link } from 'react-router-dom';
import PlayButton from '../PlayButton/PlayButton';

import styles from './CarouselCardActions.module.css';

interface Props {
  id: number,
  isMovie?: boolean;
}

const CarouselCardActions: React.FC<Props> = ({ id, isMovie = false }) => {

  const getWatchLink = () => isMovie ? `/movies/play/${id}` : `/shows/play/${id}`; 

  const getInfoLink = () => isMovie ? `/movies/${id}` : `/shows/${id}`;

  return (
    <CardActions>
      <PlayButton url={getWatchLink()} />
      <Link to={getInfoLink()}>
        <FontAwesomeIcon className={styles.icon} icon={faListUl} />
      </Link>
    </CardActions>
  );
};

export default CarouselCardActions;
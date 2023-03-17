import React from 'react';
import { CardActions } from '@mui/material';
import PlayButton from '../PlayButton/PlayButton';
import AddToListButton from '../AddToListButton/AddToListButton';
import { default as AddToListButtonUI } from '../../ui/AddToListButton/AddToListButton';
import styles from './CarouselCardActions.module.css';

interface Props {
  id: number;
  title: string;
  onHover: (isHovered: boolean) => void;
  isMovie?: boolean;
  isOnProfile?: boolean;
  isMovieAddedToList?: boolean;
}

const CarouselCardActions: React.FC<Props> = ({
  id,
  title,
  isMovie = false,
  isOnProfile = false,
  isMovieAddedToList = false,
  onHover,
}) => {
  const getWatchLink = () => (isMovie ? `/movies/play/${id}` : `/shows/play/${id}`);

  return (
    <CardActions
      onMouseLeave={() => onHover(false)}
      onMouseEnter={() => onHover(true)}
      className={styles.container}
    >
      <PlayButton url={getWatchLink()} size={65} />
      <AddToListButton
        isMovieAddedToList={isMovieAddedToList}
        isOnProfile={isOnProfile}
        movieName={title}
        movieId={id}
        isMovie={isMovie}
      >
        {(props) => <AddToListButtonUI hasMargin {...props} size={65} />}
      </AddToListButton>
    </CardActions>
  );
};

export default CarouselCardActions;

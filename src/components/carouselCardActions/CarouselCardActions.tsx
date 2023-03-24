import React from 'react';
import { CardActions } from '@mui/material';
import PlayButton from '../PlayButton/PlayButton';
import AddToListButton from '../AddToListButton/AddToListButton';
import { default as AddToListButtonUI } from '../../ui/AddToListButton/AddToListButton';
import styles from './CarouselCardActions.module.css';
import InfoButton from '../../ui/InfoButton/InfoButton';

interface Props {
  id: number;
  title: string;
  onHover?: (isHovered: boolean) => void;
  onInfoClick?: () => void;
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
  onInfoClick,
  onHover,
}) => {
  const getWatchLink = () => (isMovie ? `/movies/play/${id}` : `/shows/play/${id}`);
  const iconsSize = 65;
  return (
    <CardActions
      onMouseLeave={() => onHover && onHover(false)}
      onMouseEnter={() => onHover && onHover(true)}
      className={styles.container}
    >
      <InfoButton onClick={onInfoClick} />
      <PlayButton url={getWatchLink()} size={iconsSize} />
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

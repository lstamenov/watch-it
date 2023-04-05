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
  isOnBigCard?: boolean;
}

const CarouselCardActions: React.FC<Props> = ({
  id,
  title,
  isMovie = false,
  isOnProfile = false,
  isMovieAddedToList = false,
  isOnBigCard = false,
  onInfoClick,
  onHover,
}) => {
  const getWatchLink = () => (isMovie ? `/movies/play/${id}` : `/shows/play/${id}`);
  const iconsSize = 105;
  return (
    <CardActions
      onMouseLeave={() => onHover && onHover(false)}
      onMouseEnter={() => onHover && onHover(true)}
      className={`${styles.container} ${isOnBigCard ? styles.bigCard : styles.regularCard}`}
    >
      <PlayButton isTransparent url={getWatchLink()} size={iconsSize} />
      <div className={styles.buttonsContainer}>
        <InfoButton isTransparent onClick={onInfoClick} />
        <AddToListButton
          isMovieAddedToList={isMovieAddedToList}
          isOnProfile={isOnProfile}
          movieName={title}
          movieId={id}
          isMovie={isMovie}
        >
          {(props) => <AddToListButtonUI isTransparent {...props} size={40} />}
        </AddToListButton>
      </div>
    </CardActions>
  );
};

export default CarouselCardActions;

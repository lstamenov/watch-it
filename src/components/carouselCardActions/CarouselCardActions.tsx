import React from 'react';
import { CardActions } from '@mui/material';
import PlayButton from '../PlayButton/PlayButton';
import ListButton from '../ListButton/ListButton';
import AddToListButton from '../AddToListButton/AddToListButton';
import { default as AddToListButtonUI } from '../../ui/AddToListButton/AddToListButton';

interface Props {
  id: number;
  title: string;
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
}) => {
  const getWatchLink = () =>
    isMovie ? `/movies/play/${id}` : `/shows/play/${id}`;
  const getInfoLink = () => (isMovie ? `/movies/${id}` : `/shows/${id}`);

  return (
    <CardActions>
      <PlayButton url={getWatchLink()} />
      <ListButton url={getInfoLink()} />
      <AddToListButton
        isMovieAddedToList={isMovieAddedToList}
        isOnProfile={isOnProfile}
        movieName={title}
        movieId={id}
        isMovie={isMovie}
      >
        {(props) => <AddToListButtonUI hasMargin {...props} />}
      </AddToListButton>
    </CardActions>
  );
};

export default CarouselCardActions;

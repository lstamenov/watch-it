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
}

const CarouselCardActions: React.FC<Props> = ({ id, title, isMovie = false }) => {

  const getWatchLink = () => isMovie ? `/movies/play/${id}` : `/shows/play/${id}`; 

  const getInfoLink = () => isMovie ? `/movies/${id}` : `/shows/${id}`;

  return (
    <CardActions>
      <PlayButton url={getWatchLink()} />
      <ListButton url={getInfoLink()} />
      <AddToListButton movieName={title} movieId={id} isMovie={isMovie}>
        {(props) => <AddToListButtonUI {...props} />}
      </AddToListButton>
    </CardActions>
  );
};

export default CarouselCardActions;
import React from 'react';
import { CardActions } from '@mui/material';
import PlayButton from '../PlayButton/PlayButton';
import ListButton from '../ListButton/ListButton';

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
      <ListButton url={getInfoLink()} />
    </CardActions>
  );
};

export default CarouselCardActions;
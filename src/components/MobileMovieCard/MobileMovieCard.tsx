import React, { useState } from 'react';
import { Movie } from '../../types/types';
import { Card, CardMedia } from '@mui/material';
import styles from './MobileMovieCard.module.css';
import { getMoviePosterPath } from '../../utils/movieUtils';
import InfoModalMobile from '../../ui/InfoModalMobile/InfoModalMobile';

interface Props {
  movie: Movie;
  isOnProfile?: boolean;
}

const MobileMovieCard: React.FC<Props> = ({ movie }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClose = () => setIsClicked(false);

  return (
    <>
      <Card onClick={() => setIsClicked(true)}>
        <CardMedia className={styles.card} image={getMoviePosterPath(movie.poster_path)} />
      </Card>
      <InfoModalMobile isOpen={isClicked} onClose={handleClose} movie={movie} />
    </>
  );
};

export default MobileMovieCard;

import React, { useState } from 'react';
import { Movie } from '../../types/types';
import { Card, CardMedia } from '@mui/material';
import styles from './MobileMovieCard.module.css';
import {
  convertMinutesToHours,
  getMoviePosterPath,
} from '../../utils/movieUtils';
import Modal from '../Modal/Modal';
import CarouselDetail from '../carouselDetail/CarouselDetail';

interface Props {
  movie: Movie;
}

const MobileMovieCard: React.FC<Props> = ({ movie }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <>
      <Modal {...movie} isClicked={isClicked} setIsClicked={setIsClicked}>
        <CarouselDetail value={convertMinutesToHours(movie.runtime)} />
        <CarouselDetail value={movie.original_language.toUpperCase()} />
        <CarouselDetail value={String(movie.vote_average.toFixed(1))} />
      </Modal>
      <Card onClick={() => setIsClicked(true)}>
        <CardMedia
          className={styles.card}
          image={getMoviePosterPath(movie.poster_path)}
        />
      </Card>
    </>
  );
};

export default MobileMovieCard;

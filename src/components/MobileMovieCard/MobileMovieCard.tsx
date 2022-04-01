import React from 'react';
import { Movie } from '../../types/types';
import { Card, CardMedia } from '@mui/material';
import styles from './MobileMovieCard.module.css';
import { getMoviePosterPath } from '../../utils/movieUtils';

interface Props {
  movie: Movie;
}

const MobileMovieCard: React.FC<Props> = ({ movie }) => {
  return (
      <>
        <Card>
          <CardMedia className={styles.card} image={getMoviePosterPath(movie.poster_path)} />
        </Card>
      </>
  );
};

export default MobileMovieCard;

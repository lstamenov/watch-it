import React from 'react';
import { Movie, TvShow } from '../../types/types';
import { Card, CardMedia } from '@mui/material';
import styles from './MobileMovieCard.module.css';
import { getMoviePosterPath } from '../../utils/movieUtils';
import { Link } from 'react-router-dom';

interface Props {
  movie: Movie | TvShow;
  path: string;
}

const MobileMovieCard: React.FC<Props> = ({ movie, path }) => {
  return (
      <Link to={`${path}/${movie.id}`}>
        <Card>
          <CardMedia className={styles.card} image={getMoviePosterPath(movie.poster_path)} />
        </Card>
      </Link>
  );
};

export default MobileMovieCard;

import React from 'react';
import { Movie } from '../../types/types';
import { Card, CardMedia } from '@mui/material';
import styles from './MobileMovieCard.module.css';
import { getMoviePosterPath } from '../../utils/movieUtils';
import { useNavigate } from 'react-router-dom';

interface Props {
  movie: Movie;
  isOnProfile?: boolean;
}

const MobileMovieCard: React.FC<Props> = ({ movie }) => {
  const navigate = useNavigate();

  const onClick = () => navigate(`/movies/${movie.id}`);

  return (
    <Card onClick={onClick}>
      <CardMedia className={styles.card} image={getMoviePosterPath(movie.poster_path)} />
    </Card>
  );
};

export default MobileMovieCard;

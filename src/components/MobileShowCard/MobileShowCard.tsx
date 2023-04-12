import React from 'react';
import { TvShow } from '../../types/types';
import { Card, CardMedia } from '@mui/material';
import { getMoviePosterPath } from '../../utils/movieUtils';
import styles from './MobileShowCard.module.css';
import { useNavigate } from 'react-router-dom';

interface Props {
  show: TvShow;
  isOnProfile?: boolean;
}

const MobileShowCard: React.FC<Props> = ({ show }) => {
  const navigate = useNavigate();

  const onClick = () => navigate(`/shows/${show.id}`);

  return (
    <Card onClick={onClick}>
      <CardMedia className={styles.card} image={getMoviePosterPath(show.poster_path)} />
    </Card>
  );
};

export default MobileShowCard;

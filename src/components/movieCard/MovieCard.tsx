import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  Grid,
  StyledEngineProvider,
  Typography,
} from '@mui/material';
import { TrendingMovie, TrendingShow } from '../../types/types';
import { getMoviePosterPath } from '../../utils/movieUtils';
import CarouselGenres from '../carouselGenres/CarouselGenres';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import styles from './MovieCard.module.css';
import PlayButton from '../PlayButton/PlayButton';
import useMobile from '../../hooks/useMobile';

interface Props {
  movie: TrendingMovie | TrendingShow;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMobile();

  const onMouseEnter = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  const onClick = () => {
    setIsHovered(!isHovered);
  };

  const isShow = () => {
    const firstAirDate = (movie as TrendingShow).first_air_date;
    return !!firstAirDate;
  };

  const getTitle = () => {
    if (isShow()) {
      return (movie as TrendingShow).name;
    }
    return (movie as TrendingMovie).title;
  };

  const getWatchUrl = () => {
    return isShow() ? `/shows/play/${movie.id}` : `/movies/play/${movie.id}`;
  };

  const renderCardContent = () => (
    <>
      {isHovered && (
        <div className={styles.container}>
          <Typography className={styles.title} variant="h6">
            {getTitle()}
          </Typography>
          <CarouselGenres genres={movie.genres} />
          <div className={styles.details}>
            <FontAwesomeIcon
              className={styles.icon}
              size={'2x'}
              color="white"
              icon={faCircleInfo}
            />
            <PlayButton url={getWatchUrl()} />
          </div>
        </div>
      )}
    </>
  );

  return movie.poster_path ? (
    <StyledEngineProvider injectFirst>
      <Grid item md={3} xs={6} sm={4}>
        {isMobile ? (
          <Card
            onClick={onClick}
            className={styles.card}
            elevation={3}
          >
            <CardMedia
              onClick={onClick}
              image={getMoviePosterPath(movie.poster_path)}
              className={isHovered ? styles.smallPoster : styles.bigPoster}
            />
            {renderCardContent()}
          </Card>
        ) : (
          <Card
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            className={styles.card}
            elevation={3}
          >
            <CardMedia
              image={getMoviePosterPath(movie.poster_path)}
              className={isHovered ? styles.smallPoster : styles.bigPoster}
            />
            {isMobile ? null : renderCardContent()}
          </Card>
        )}
      </Grid>
    </StyledEngineProvider>
  ) : null;
};

export default MovieCard;

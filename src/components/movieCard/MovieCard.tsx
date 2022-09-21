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
import styles from './MovieCard.module.css';
import PlayButton from '../PlayButton/PlayButton';
import useMobile from '../../hooks/useMobile';
import ListButton from '../ListButton/ListButton';
import Modal from '../Modal/Modal';
import CarouselDetail from '../carouselDetail/CarouselDetail';

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

  const isShow = movie.media_type === 'tv';  

  const getTitle = () => {
    if (isShow) {
      return (movie as TrendingShow).name;
    }
    return (movie as TrendingMovie).title;
  };

  const getUrl = (urlType: 'explore' | 'watch') => {
    if (isShow) {
      return urlType === 'explore' ? `/shows/${movie.id}` : `/shows/play/${movie.id}`;
    }

    return urlType === 'explore' ? `/movies/${movie.id}` : `/movies/play/${movie.id}`;
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
            <ListButton url={getUrl('explore')} />
            <PlayButton url={getUrl('watch')} />
          </div>
        </div>
      )}
    </>
  );

  return movie.poster_path ? (
    <StyledEngineProvider injectFirst>
      <Grid item md={3} xs={6} sm={4}>
        {isMobile ? (
          <Card onClick={onClick} className={styles.card} elevation={3}>
            <CardMedia
              onClick={onClick}
              image={getMoviePosterPath(movie.poster_path)}
              className={styles.bigPoster}
            />
            <Modal isShow={isShow} title={getTitle()} {...movie} isClicked={isHovered} setIsClicked={setIsHovered}>
              <CarouselDetail value={movie.original_language.toUpperCase()} />
              <CarouselDetail value={`${movie.vote_average}`} />
            </Modal>
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

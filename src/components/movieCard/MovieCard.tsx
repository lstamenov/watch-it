import React, { useState } from 'react';
import { Card, CardMedia, Grid, StyledEngineProvider } from '@mui/material';
import { TrendingMovie, TrendingShow } from '../../types/types';
import { getMoviePosterPath } from '../../utils/movieUtils';
import styles from './MovieCard.module.css';
import Modal from '../Modal/Modal';
import CarouselDetail from '../carouselDetail/CarouselDetail';
import useMobile from '../../hooks/useMobile';

interface Props {
  movie: TrendingMovie | TrendingShow;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMobile();

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

  return movie.poster_path && movie.backdrop_path ? (
    <StyledEngineProvider injectFirst>
      <Grid item xs={6} sm={4}>
        {
          <Card onClick={onClick} className={styles.card} elevation={6}>
            <CardMedia
              onClick={onClick}
              image={getMoviePosterPath(movie.poster_path)}
              className={styles.bigPoster}
            />
            <Modal
              isDesktop={!isMobile}
              isShow={isShow}
              title={getTitle()}
              {...movie}
              isClicked={isHovered}
              setIsClicked={setIsHovered}
            >
              <CarouselDetail value={movie.original_language.toUpperCase()} />
              <CarouselDetail value={`${movie.vote_average?.toFixed(1)}`} />
            </Modal>
          </Card>
        }
      </Grid>
    </StyledEngineProvider>
  ) : null;
};

export default MovieCard;

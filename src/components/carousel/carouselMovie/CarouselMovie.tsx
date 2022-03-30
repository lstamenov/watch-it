import React, { useState } from 'react';
import { CarouselMovieProps } from './types';
import {
  getMoviePosterPath,
  convertMinutesToHours,
} from '../../../utils/movieUtils';
import CarouselGenres from '../../carouselGenres/CarouselGenres';
import CarouselDetail from '../../carouselDetail/CarouselDetail';
import styles from './CarouselMovie.module.css';
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import CarouselCardActions from '../../carouselCardActions/CarouselCardActions';
import useMobile from '../../../hooks/useMobile';

const CarouselMovie: React.FC<CarouselMovieProps> = ({ movie }) => {
  const isMobile = useMobile();
  const [isWrapperHovered, setIsWrapperHovered] = useState(false);

  const onMouseLeave = () => {
    setIsWrapperHovered(false);
  };

  const onHover = () => {
    setIsWrapperHovered(true);
  };

  const renderMobile = () => (
    <Grid>
      <Card
        className={styles.wrapper}
        elevation={6}
      >
        <CardMedia
          className={styles.poster}
          image={getMoviePosterPath(movie.poster_path)}
        />
      </Card>
    </Grid>
  );

  return movie.poster_path ? (
    isMobile ? renderMobile() : <Grid>
      <Card
        onMouseEnter={onHover}
        onMouseLeave={onMouseLeave}
        className={styles.wrapper}
        elevation={6}
      >
        <CardMedia
          className={styles.poster}
          image={getMoviePosterPath(movie.poster_path)}
        />
        {isWrapperHovered && (
          <CardContent className={styles.content}>
            <CarouselGenres isShow={false} genres={movie.genres} />
            <Grid className={styles.details} container spacing={1}>
              <Grid item>
                <CarouselDetail value={convertMinutesToHours(movie.runtime)} />
              </Grid>
              <Grid item>
                <CarouselDetail value={movie.original_language.toUpperCase()} />
              </Grid>
            </Grid>
            <CarouselCardActions isMovie={true} id={movie.id} />
          </CardContent>
        )}
      </Card>
    </Grid>
  ) : null;
};

export default CarouselMovie;

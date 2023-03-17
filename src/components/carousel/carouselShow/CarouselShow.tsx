import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Grid, StyledEngineProvider } from '@mui/material';
import { TvShow } from '../../../types/types';
import { getMoviePosterPath } from '../../../utils/movieUtils';
import CarouselCardActions from '../../carouselCardActions/CarouselCardActions';
import CarouselDetail from '../../carouselDetail/CarouselDetail';
import CarouselGenres from '../../carouselGenres/CarouselGenres';
import styles from '../carouselMovie/CarouselMovie.module.css';
import { useAppSelector } from '../../../store/hooks';
import { selectUser } from '../../../store/user/selectors';

interface Props {
  show: TvShow;
  isOnProfile?: boolean;
}

const CarouselShow: React.FC<Props> = ({ show, isOnProfile = false }) => {
  const [isWrapperHovered, setIsWrapperHovered] = useState(false);
  const user = useAppSelector(selectUser);

  const onMouseLeave = () => {
    setIsWrapperHovered(false);
  };

  const onHover = () => {
    setIsWrapperHovered(true);
  };

  const isMovieAddedToList = (): boolean => {
    if (!user) return false;

    return !!user.showsList.find((id) => id === show.id);
  };

  return (
    <StyledEngineProvider injectFirst>
      <Grid item>
        <Card
          onMouseEnter={onHover}
          onMouseLeave={onMouseLeave}
          className={styles.wrapper}
          elevation={6}
        >
          <CardMedia className={styles.poster} image={getMoviePosterPath(show.poster_path)} />
          {isWrapperHovered && (
            <CardContent className={styles.content}>
              <CarouselGenres genres={show.genres} />
              <Grid className={styles.details} container spacing={1}>
                <Grid item>
                  <CarouselDetail
                    value={`${show.number_of_seasons} ${
                      show.number_of_seasons === 1 ? 'Season' : 'Seasons'
                    }`}
                  />
                </Grid>
                <Grid item>
                  <CarouselDetail value={show.original_language.toUpperCase()} />
                </Grid>
              </Grid>
              <CarouselCardActions
                isMovieAddedToList={isMovieAddedToList()}
                isOnProfile={isOnProfile}
                title={show.name}
                id={show.id}
              />
            </CardContent>
          )}
        </Card>
      </Grid>
    </StyledEngineProvider>
  );
};

export default CarouselShow;

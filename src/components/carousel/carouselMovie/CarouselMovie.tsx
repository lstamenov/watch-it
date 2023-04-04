import React, { useState } from 'react';
import { CarouselMovieProps } from './types';
import { getMoviePosterPath, convertMinutesToHours } from '../../../utils/movieUtils';
import CarouselGenres from '../../carouselGenres/CarouselGenres';
import CarouselDetail from '../../carouselDetail/CarouselDetail';
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import CarouselCardActions from '../../carouselCardActions/CarouselCardActions';
import InfoModalMobile from '../../../ui/InfoModalMobile/InfoModalMobile';
import { useUser } from '../../../store';
import styles from './CarouselMovie.module.css';

const CarouselMovie: React.FC<CarouselMovieProps> = ({ movie, isOnProfile = false }) => {
  const [isWrapperHovered, setIsWrapperHovered] = useState(false);
  const [areActionsHovered, setAreActionsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();

  const onMouseLeave = () => {
    setIsWrapperHovered(false);
  };

  const onHover = () => {
    setIsWrapperHovered(true);
  };

  const isMovieAddedToList = (): boolean => {
    if (!user) return false;

    return !!user.user?.moviesList.find((id) => id === movie.id);
  };

  const onInfoButtonClick = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  const onActionsHover = (areHovered: boolean) => setAreActionsHovered(areHovered);

  return movie.poster_path ? (
    <>
      <Grid>
        <Card
          onMouseEnter={onHover}
          onMouseLeave={onMouseLeave}
          className={styles.wrapper}
          elevation={6}
        >
          <CardMedia
            sx={areActionsHovered ? { filter: 'blur(3px)' } : {}}
            component={'image'}
            className={styles.poster}
            image={getMoviePosterPath(movie.poster_path)}
          />
          {isWrapperHovered && (
            <CarouselCardActions
              isMovieAddedToList={isMovieAddedToList()}
              onInfoClick={onInfoButtonClick}
              isOnProfile={isOnProfile}
              title={movie.original_title}
              isMovie={true}
              id={movie.id}
              onHover={onActionsHover}
            />
          )}
          {isWrapperHovered && (
            <CardContent className={styles.content}>
              <CarouselGenres genres={movie.genres} />
              <Grid className={styles.details} container spacing={1}>
                <Grid item>
                  <CarouselDetail value={convertMinutesToHours(movie.runtime)} />
                </Grid>
                <Grid item>
                  <CarouselDetail value={movie.original_language.toUpperCase()} />
                </Grid>
              </Grid>
            </CardContent>
          )}
        </Card>
      </Grid>
      <InfoModalMobile isOpen={isModalOpen} onClose={handleCloseModal} movie={movie} />
    </>
  ) : null;
};

export default CarouselMovie;

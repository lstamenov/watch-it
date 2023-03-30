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
import InfoModalMobile from '../../../ui/InfoModalMobile/InfoModalMobile';

interface Props {
  show: TvShow;
  isOnProfile?: boolean;
}

const CarouselShow: React.FC<Props> = ({ show, isOnProfile = false }) => {
  const [isWrapperHovered, setIsWrapperHovered] = useState(false);
  const [areActionsHovered, setAreActionsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const onInfoButtonClick = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  const onActionsHover = (areHovered: boolean) => setAreActionsHovered(areHovered);

  return (
    <StyledEngineProvider injectFirst>
      <Grid item>
        <Card
          onMouseEnter={onHover}
          onMouseLeave={onMouseLeave}
          className={styles.wrapper}
          elevation={6}
        >
          <CardMedia
            sx={areActionsHovered ? { filter: 'blur(3px)' } : {}}
            className={styles.poster}
            image={getMoviePosterPath(show.poster_path)}
          />
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
                onHover={onActionsHover}
                onInfoClick={onInfoButtonClick}
              />
            </CardContent>
          )}
        </Card>
      </Grid>
      <InfoModalMobile isOpen={isModalOpen} onClose={handleCloseModal} movie={show} />
    </StyledEngineProvider>
  );
};

export default CarouselShow;

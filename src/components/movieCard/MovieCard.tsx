import React, { useMemo, useState } from 'react';
import { Card, CardMedia, Grid, StyledEngineProvider } from '@mui/material';
import { TrendingMovie, TrendingShow } from '../../types/types';
import { getMoviePosterPath } from '../../utils/movieUtils';
import styles from './MovieCard.module.css';
import Modal from '../Modal/Modal';
import CarouselDetail from '../carouselDetail/CarouselDetail';
import useMobile from '../../hooks/useMobile';
import CarouselCardActions from '../carouselCardActions/CarouselCardActions';
import InfoModalMobile from '../../ui/InfoModalMobile/InfoModalMobile';

interface Props {
  movie: TrendingMovie | TrendingShow;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMobile();

  const onClick = () => {
    setIsClicked(!isClicked);
  };

  const onHover = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  const isShow = movie.media_type === 'tv';

  const getTitle = () => {
    if (isShow) {
      return (movie as TrendingShow).name;
    }
    return (movie as TrendingMovie).title;
  };

  const DesktopModal = useMemo(
    () => (
      <Modal
        isDesktop={!isMobile}
        isShow={isShow}
        title={getTitle()}
        {...movie}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
      >
        <CarouselDetail value={movie.original_language.toUpperCase()} />
        <CarouselDetail value={`${movie.vote_average?.toFixed(1)}`} />
      </Modal>
    ),
    [movie, isClicked, setIsClicked, isShow, getTitle],
  );

  return movie.poster_path && movie.backdrop_path ? (
    <StyledEngineProvider injectFirst>
      <Grid item xs={6} sm={4}>
        {
          <Card
            onMouseEnter={onHover}
            onMouseLeave={onMouseLeave}
            className={styles.card}
            elevation={6}
            onClick={isMobile ? onClick : undefined}
          >
            <CardMedia
              onClick={onClick}
              image={getMoviePosterPath(movie.poster_path)}
              className={styles.bigPoster}
              sx={isHovered && !isMobile ? { filter: 'blur(4px)' } : {}}
            />
            {isHovered && !isMobile && (
              <CarouselCardActions
                onInfoClick={onClick}
                id={movie.id}
                title={getTitle()}
                isMovie={!isShow}
              />
            )}
            {!isMobile && DesktopModal}
            {isMobile && (
              <InfoModalMobile
                isOpen={isClicked}
                movie={movie}
                onClose={() => setIsClicked(false)}
              />
            )}
          </Card>
        }
      </Grid>
    </StyledEngineProvider>
  ) : null;
};

export default MovieCard;

import React, { useMemo, useState } from 'react';
import { Card, CardMedia, Grid, StyledEngineProvider } from '@mui/material';
import { Movie, TvShow } from '../../types/types';
import { getMoviePosterPath, isShow } from '../../utils/movieUtils';
import styles from './MovieCard.module.css';
import useMobile from '../../hooks/useMobile';
import CarouselCardActions from '../carouselCardActions/CarouselCardActions';
import { useUser } from '../../store';
import { useNavigate } from 'react-router-dom';

interface Props {
  movie: Movie | TvShow;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
  const navigate = useNavigate();
  const {
    user: { user },
  } = useUser();
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useMobile();

  const isShowContent = isShow(movie);

  const onClick = () => {
    if (isShowContent) {
      navigate(`/shows/${movie.id}`);
    }

    navigate(`/movies/${movie.id}`);
  };

  const onHover = () => {
    setIsHovered(true);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
  };

  const getTitle = () => {
    if (isShowContent) {
      return movie.name;
    }
    return movie.title;
  };

  const isAddedToList = useMemo(() => {
    if (!user) return false;

    if (user.list.movies.find((m) => m.id === movie.id)) return true;

    if (user.list.shows.find((m) => m.id === movie.id)) return true;

    return false;
  }, [movie]);

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
                isMovieAddedToList={isAddedToList}
                isOnBigCard
              />
            )}
          </Card>
        }
      </Grid>
    </StyledEngineProvider>
  ) : null;
};

export default MovieCard;

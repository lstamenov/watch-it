import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../store/hooks';
import {
  loadCurrentMovie,
  loadSuggestedMovies,
} from '../../../store/watch/thunk';
import {
  selectCurrentMovie,
  selectMovieRecommendations,
  selectSimilarMovies,
} from '../../../store/watch/selectors';
import Player from '../Player/Player';
import { StyledEngineProvider } from '@mui/material';
import { getMoviePosterPath } from '../../../utils/movieUtils';
import WatchLayout from '../../../layouts/WatchLayout/WatchLayout';
import useMobile from '../../../hooks/useMobile';
import AnimatedPage from '../../../ui/AnimatedPage/AnimatedPage';

const MoviePlayer: React.FC = () => {
  const [isCorrectId, setIsCorrectId] = useState(false);
  const isMobile = useMobile();

  const movieId = useParams().id;
  const movie = useAppSelector(selectCurrentMovie);
  const similar = useAppSelector(selectSimilarMovies);
  const recommended = useAppSelector(selectMovieRecommendations);

  const dispatch = useDispatch();

  useEffect(() => {
    const id = movieId ? parseInt(movieId) : -1;

    if (id !== -1) {
      setIsCorrectId(true);
      dispatch(loadCurrentMovie(id));
    } else {
      setIsCorrectId(false);
    }
  }, [movieId]);

  useEffect(() => {
    dispatch(loadSuggestedMovies());
  }, [movie]);

  return (
    <AnimatedPage>
      {isCorrectId && movie ? (
        <StyledEngineProvider injectFirst>
          <WatchLayout
            similar={similar}
            recommended={recommended}
            overview={movie.overview}
            posterUrl={getMoviePosterPath(
              isMobile ? movie.poster_path : movie.backdrop_path,
            )}
            title={movie.original_title}
          >
            <Player isShow={false} id={movie.imdb_id} />
          </WatchLayout>
        </StyledEngineProvider>
      ) : null}
    </AnimatedPage>
  );
};

export default MoviePlayer;

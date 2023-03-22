import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../store/hooks';
import { loadCurrentMovie, loadSuggestedMovies } from '../../../store/watch/thunk';
import {
  selectCurrentMovie,
  selectMovieRecommendations,
  selectSimilarMovies,
} from '../../../store/watch/selectors';
import { StyledEngineProvider } from '@mui/material';
import WatchLayout from '../../../layouts/WatchLayout/WatchLayout';
import AnimatedPage from '../../../ui/AnimatedPage/AnimatedPage';
import styles from '../Watch.module.css';
import { useTranslation } from 'react-i18next';

const MoviePlayer: React.FC = () => {
  const [isCorrectId, setIsCorrectId] = useState(false);
  const movieId = useParams().id;
  const movie = useAppSelector(selectCurrentMovie);
  const similar = useAppSelector(selectSimilarMovies);
  const recommended = useAppSelector(selectMovieRecommendations);
  const { i18n } = useTranslation();
  const movieURL = `https://autoembed.to/movie/imdb/${movie?.imdb_id}`;

  const dispatch = useDispatch();

  useEffect(() => {
    const id = movieId ? parseInt(movieId) : -1;

    if (id !== -1) {
      setIsCorrectId(true);
      dispatch(loadCurrentMovie(id));
    } else {
      setIsCorrectId(false);
    }
  }, [movieId, i18n.language]);

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
            title={movie.original_title}
          >
            <iframe
              frameBorder="0"
              className={styles.player}
              src={movieURL}
              allowFullScreen
            ></iframe>
          </WatchLayout>
        </StyledEngineProvider>
      ) : null}
    </AnimatedPage>
  );
};

export default MoviePlayer;

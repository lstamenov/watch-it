import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { StyledEngineProvider } from '@mui/material';
import WatchLayout from '../../../layouts/WatchLayout/WatchLayout';
import AnimatedPage from '../../../ui/AnimatedPage/AnimatedPage';
import styles from '../Watch.module.css';
import { useTranslation } from 'react-i18next';
import { useWatchMovie } from '../../../store';
import { Helmet } from 'react-helmet';
import { getMoviePosterPath } from '../../../utils/movieUtils';

const MoviePlayer: React.FC = () => {
  const [isCorrectId, setIsCorrectId] = useState(false);
  const movieId = useParams().id;
  const {
    movieData: { movie, recommendations, similar, status },
    loadMovie,
  } = useWatchMovie();
  const { i18n, t } = useTranslation();
  const movieURL = `https://autoembed.to/movie/imdb/${movie?.imdb_id}`;

  useEffect(() => {
    const id = movieId ? parseInt(movieId) : -1;

    if (id !== -1) {
      setIsCorrectId(true);
      loadMovie(id);
    } else {
      setIsCorrectId(false);
    }
  }, [movieId, i18n.language]);

  return (
    <AnimatedPage isLoading={status === 'pending'}>
      {isCorrectId && movie ? (
        <StyledEngineProvider injectFirst>
          <Helmet>
            <title>watch365 - {movie.title}</title>
            <meta name="description" content={movie.overview} />
            <meta name="keywords" content={t('HOME_KEYWORDS') || ''} />
          </Helmet>
          <WatchLayout
            isLoading={status === 'pending'}
            similar={similar}
            recommended={recommendations}
            overview={movie.overview}
            title={movie.title}
            backDropImage={getMoviePosterPath(movie.backdrop_path)}
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

import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useWatchMovie } from '../../store';
import { Movie } from '../../types/types';

interface Props {
  movieId: number;
  children: (props: {
    movie: Movie | null;
    similar: Movie[];
    recommendations: Movie[];
    watchLink: string;
  }) => JSX.Element;
}

const MoviePageLayout: React.FC<Props> = ({ movieId, children }) => {
  const {
    loadMovie,
    movieData: { movie, recommendations, similar },
    clear,
  } = useWatchMovie();
  const { i18n } = useTranslation();

  useEffect(() => {
    loadMovie(movieId);

    return () => {
      clear();
    };
  }, [movieId, i18n.language]);

  const watchLink = useMemo(() => `/movies/play/${movieId}`, [movieId]);

  return children({ movie, recommendations, similar, watchLink });
};

export default MoviePageLayout;

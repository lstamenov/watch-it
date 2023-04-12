import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import MoviePageLayout from '../../components/MoviePageLayout/MoviePageLayout';
import { useWatchMovie } from '../../store';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';
import { default as MoviePageLayoutUI } from '../../ui/MoviePageLayout/MoviePageLayout';

const Movie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const movieId = id ? Number(id) : -1;
  const {
    movieData: { status },
  } = useWatchMovie();

  const Content = useMemo(
    () => (
      <MoviePageLayout movieId={movieId}>
        {(props) => <MoviePageLayoutUI {...props} />}
      </MoviePageLayout>
    ),
    [movieId],
  );

  return <AnimatedPage isLoading={status === 'pending'}>{Content}</AnimatedPage>;
};

export default Movie;

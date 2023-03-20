import React from 'react';
import MovieLayout from '../../layouts/MovieLayout/MovieLayout';
import { default as MovieLayoutUI } from '../../ui/MovieLayout/MovieLayout';
import Loader from '../../components/loader/Loader';
import NotFound from '../NotFound/NotFound';
import { Movie as MovieType } from '../../types/types';
import Page from '../../ui/Page/Page';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';
import { useAppSelector } from '../../store/hooks';
import { selectCurrentMovie } from '../../store/watch/selectors';
import { Helmet } from 'react-helmet';

const Movie: React.FC = () => {
  const currentMovie = useAppSelector(selectCurrentMovie);

  const renderContent = (
    movie: MovieType | null,
    similarMovies: MovieType[],
    recommendedMovies: MovieType[],
  ) => {
    if (movie) {
      return (
        <MovieLayoutUI
          movie={movie}
          similarMovies={similarMovies}
          recommendedMovies={recommendedMovies}
        />
      );
    }

    return <NotFound />;
  };

  return (
    <AnimatedPage>
      <Page>
        <Helmet>
          <title>{'asdaasd'}</title>
          <meta name="description" content={currentMovie?.overview} />
        </Helmet>
        <MovieLayout>
          {(props) => {
            return props.isLoading ? (
              <Loader />
            ) : (
              renderContent(props.movie, props.similarMovies, props.recommendedMovies)
            );
          }}
        </MovieLayout>
      </Page>
    </AnimatedPage>
  );
};

export default Movie;

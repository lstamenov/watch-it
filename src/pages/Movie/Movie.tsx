import React from 'react';
import MovieLayout from '../../layouts/MovieLayout/MovieLayout';
import { default as MovieLayoutUI } from '../../ui/MovieLayout/MovieLayout';
import Loader from '../../components/loader/Loader';
import NotFound from '../NotFound/NotFound';
import { Movie as MovieType } from '../../types/types';
import Page from '../../ui/Page/Page';

const Movie: React.FC = () => {
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
    <Page>
      <MovieLayout>
        {(props) => {
          return props.isLoading ? (
            <Loader />
          ) : (
            renderContent(
              props.movie,
              props.similarMovies,
              props.recommendedMovies,
            )
          );
        }}
      </MovieLayout>
    </Page>
  );
};

export default Movie;

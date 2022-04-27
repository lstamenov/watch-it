import React from 'react';
import BackgroundLayout from '../../layouts/BackgroundLayout';
import ContentOverviewLayout from '../../layouts/ContentOverviewLayout/ContentOverviewLayout';
import PosterLayout from '../../layouts/PosterLayout/PosterLayout';
import { Movie } from '../../types/types';
import { getMoviePosterPath } from '../../utils/movieUtils';
import styles from './MovieLayout.module.css';

interface Props {
  movie: Movie;
  similarMovies: Movie[];
  recommendedMovies: Movie[];
}

const MovieLayout: React.FC<Props> = ({ movie }) => {
  const fields = [
    {
      key: 'Title',
      value: movie.title,
    },
    {
      key: 'Runtime',
      value: `${movie.runtime} minutes`,
    },
    {
      key: 'Rating',
      value: String(movie.vote_average),
    },
    {
      key: 'Release date',
      value: movie.release_date,
    },
    {
      key: 'Budget',
      value: `${movie.budget}$`,
    },
    {
      key: 'Revenue',
      value: `${movie.revenue}$`,
    },
  ];

  console.log(movie);

  return (
    <BackgroundLayout path={movie.backdrop_path}>
      <div className={styles.container}>
        <PosterLayout
          image={getMoviePosterPath(movie?.poster_path)}
        >
          <ContentOverviewLayout fields={fields} />
        </PosterLayout>
      </div>
    </BackgroundLayout>
  );
};

export default MovieLayout;

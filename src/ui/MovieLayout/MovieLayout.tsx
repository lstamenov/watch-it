import React from 'react';
import BackgroundLayout from '../../layouts/BackgroundLayout';
import ContentOverviewLayout from '../../layouts/ContentOverviewLayout/ContentOverviewLayout';
import PosterLayout from '../../layouts/PosterLayout/PosterLayout';
import { Movie } from '../../types/types';
import { getMoviePosterPath } from '../../utils/movieUtils';
import OverviewLayout from '../OverviewLayout/OverviewLayout';
import styles from './MovieLayout.module.css';

interface Props {
  movie: Movie;
  similarMovies: Movie[];
  recommendedMovies: Movie[];
}

const MovieLayout: React.FC<Props> = ({ movie }) => {
  const fields = [
    {
      field: 'Runtime',
      value: `${movie.runtime} minutes`,
    },
    {
      field: 'Rating',
      value: String(movie.vote_average),
    },
    {
      field: 'Release date',
      value: movie.release_date,
    },
    {
      field: 'Budget',
      value: `${movie.budget}$`,
    },
    {
      field: 'Revenue',
      value: `${movie.revenue}$`,
    },
  ];

  return (
    <BackgroundLayout path={movie.backdrop_path}>
      <div className={styles.container}>
        <PosterLayout image={getMoviePosterPath(movie?.poster_path)}>
          <ContentOverviewLayout
            id={movie.id}
            genres={movie.genres}
            overview={movie.overview}
            title={movie.title}
            fields={fields}
          />
        </PosterLayout>
       <OverviewLayout companies={movie.production_companies} cast={movie.cast} trailer={movie.trailer?.key} />
      </div>
    </BackgroundLayout>
  );
};

export default MovieLayout;

import React from 'react';
import Carousel from '../../components/carousel/Carousel';
import CarouselMovie from '../../components/carousel/carouselMovie/CarouselMovie';
import MobileCarousel from '../../components/MobileCarousel/MobileCarousel';
import useMobile from '../../hooks/useMobile';
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

const MovieLayout: React.FC<Props> = ({ movie, similarMovies, recommendedMovies }) => {
  const isMobile = useMobile();

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

  const renderSuggestedDesktop = () => (
    <>
      {similarMovies.length > 0 && (
        <Carousel title="Similar Movies" isTransparent>
          {similarMovies.map((m) => (
            <CarouselMovie movie={m} key={m.id} />
          ))}
        </Carousel>
      )}
      {recommendedMovies.length > 0 && (
        <Carousel title="Recommended Movies" isTransparent>
          {recommendedMovies.map((m) => (
            <CarouselMovie movie={m} key={m.id} />
          ))}
        </Carousel>
      )}
    </>
  );

  const renderSuggestedMobile = () => (
    <>
      {similarMovies.length > 0 && (
        <MobileCarousel isMovieCarousel title="similar" items={similarMovies} />
      )}
      {recommendedMovies.length > 0 && (
        <MobileCarousel isMovieCarousel title="recommended" items={recommendedMovies} />
      )}
    </>
  );

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
      {isMobile ? renderSuggestedMobile() : renderSuggestedDesktop()}
    </BackgroundLayout>
  );
};

export default MovieLayout;

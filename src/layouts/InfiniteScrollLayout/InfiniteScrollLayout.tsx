import React, { useMemo } from 'react';
import useInView from 'react-cool-inview';
import ResultsLayout from '../ResultsLayout/ResultsLayout';
import MovieCard from '../../components/movieCard/MovieCard';
import { Movie, TvShow } from '../../types/types';
import NoResults from '../../components/NoResults/NoResults';
import InfiniteScrollCardSkeleton from '../../ui/InfiniteScrollCardSkeleton/InfiniteScrollCardSkeleton';

interface Props {
  movies: (Movie | TvShow)[];
  loadMovies: Function;
  page: number;
  query?: string;
  isLoading: boolean;
}

const InfiniteScrollLayout: React.FC<Props> = ({
  movies = [],
  loadMovies,
  page,
  query,
  isLoading,
}) => {
  const { observe } = useInView({
    onEnter: () => {
      if (query) {
        loadMovies(query, page + 1);
      } else {
        loadMovies(page + 1);
      }
    },
  });

  const SkeletonCards = useMemo(
    () => (
      <>
        {Array.from(Array(6), () => null).map((_, index) => (
          <InfiniteScrollCardSkeleton key={index} />
        ))}
      </>
    ),
    [],
  );

  return (
    <>
      {movies?.length === 0 && !isLoading && <NoResults />}
      <ResultsLayout>
        {movies && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        {isLoading && SkeletonCards}
        <div style={{ height: '10px' }} ref={observe}></div>
      </ResultsLayout>
    </>
  );
};

export default InfiniteScrollLayout;

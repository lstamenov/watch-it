import React from 'react';
import { useDispatch } from 'react-redux';
import useInView from 'react-cool-inview';
import ResultsLayout from '../ResultsLayout/ResultsLayout';
import MovieCard from '../../components/movieCard/MovieCard';
import { TrendingMovie, TrendingShow } from '../../types/types';

interface Props {
  movies: (TrendingMovie | TrendingShow)[],
  loadMovies: Function,
  page: number,
  query?: string;
}

const InfiniteScrollLayout: React.FC<Props> = ({ movies, loadMovies, page, query }) => {
  const dispatch = useDispatch();

  const { observe } = useInView({
    onEnter: () => {
      dispatch(query !== '' ? loadMovies(query, page + 1) : loadMovies(page + 1));
    },
  });

  return (
    <>
      <ResultsLayout>
        {movies && movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        <div style={{ height: '10px' }} ref={observe}></div>
      </ResultsLayout>
    </>
  );
};

export default InfiniteScrollLayout;
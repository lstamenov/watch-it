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
}

//bug is somewhere here

const InfiniteScrollLayout: React.FC<Props> = ({ movies, loadMovies, page }) => {
  const dispatch = useDispatch();

  const { observe } = useInView({
    onEnter: () => {
      dispatch(loadMovies(page + 1));
    },
  });

  return (
    <>
      <ResultsLayout>
        {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        <div style={{ height: '10px' }} ref={observe}></div>
      </ResultsLayout>
    </>
  );
};

export default InfiniteScrollLayout;
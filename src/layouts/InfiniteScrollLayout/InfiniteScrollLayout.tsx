import React from 'react';
import { useDispatch } from 'react-redux';
import useInView from 'react-cool-inview';
import ResultsLayout from '../ResultsLayout/ResultsLayout';
import MovieCard from '../../components/movieCard/MovieCard';
import { TrendingMovie, TrendingShow } from '../../types/types';
import NoResults from '../../components/NoResults/NoResults';
import { useAppSelector } from '../../store/hooks';
import { selectLoader } from '../../store/loader/selectors';

interface Props {
  movies: (TrendingMovie | TrendingShow)[];
  loadMovies: Function;
  page: number;
  query?: string;
}

const InfiniteScrollLayout: React.FC<Props> = ({ movies = [], loadMovies, page, query }) => {
  const dispatch = useDispatch();
  const isLoading = useAppSelector(selectLoader);

  const { observe } = useInView({
    onEnter: () => {
      dispatch(query !== '' && query ? loadMovies(query, page + 1) : loadMovies(page + 1));
    },
  });

  return (
    <>
      {movies?.length === 0 && !isLoading && <NoResults />}
      <ResultsLayout>
        {movies && movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        <div style={{ height: '10px' }} ref={observe}></div>
      </ResultsLayout>
    </>
  );
};

export default InfiniteScrollLayout;

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectLoader } from '../../store/loader/selectors';
import { selectCurrentMovie, selectMovieRecommendations, selectSimilarMovies } from '../../store/watch/selectors';
import { loadCurrentMovie } from '../../store/watch/thunk';
import { Movie } from '../../types/types';

interface Props {
  children: (props: {
    isLoading: boolean,
    movie: Movie | null,
    similarMovies: Movie[],
    recommendedMovies: Movie[],
  }) => JSX.Element;
}

const MovieLayout: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const id: number = Number(useParams().id);
  const isLoading: boolean = useAppSelector(selectLoader);
  const movie: Movie | null = useAppSelector(selectCurrentMovie);
  const similarMovies: Movie[] = useAppSelector(selectSimilarMovies);
  const recommendedMovies: Movie[] = useAppSelector(selectMovieRecommendations);

  
  useEffect(() => {
    dispatch(loadCurrentMovie(id));
  }, [id]);

  return children({
    isLoading,
    movie,
    similarMovies,
    recommendedMovies,
  });
};

export default MovieLayout;

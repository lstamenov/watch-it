import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Carousel from '../../components/carousel/Carousel';
import CarouselMovie from '../../components/carousel/carouselMovie/CarouselMovie';
import Loader from '../../components/loader/Loader';
import { useAppSelector } from '../../store/hooks';
import { loadMoviesPageData } from '../../store/movies/thunk';
import {
  selectDailyTrendingMovies,
  selectPopularMovies,
  selectUpcomingMovies,
  selectWeeklyTrendingMovies,
} from '../../store/movies/selectors';
import { selectLoader } from '../../store/loader/selectors';
import styles from './Movies.module.css';

const Movies: React.FC = () => {
  const dispatch = useDispatch();

  const dailyTrendingMovies = useAppSelector(selectDailyTrendingMovies);
  const weeklyTrendingMovies = useAppSelector(selectWeeklyTrendingMovies);
  const popularMovies = useAppSelector(selectPopularMovies);
  const upcomingMovies = useAppSelector(selectUpcomingMovies);
  const isLoading = useAppSelector(selectLoader);

  useEffect(() => {
    dispatch(loadMoviesPageData());
  }, []);

  return (
    <div className={styles.home}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Carousel title="Daily trending movies">
            {dailyTrendingMovies.map((movie) => (
              <CarouselMovie key={movie.id} movie={movie} />
            ))}
          </Carousel>
          <Carousel title="Popular movies">
            {popularMovies.map((movie) => (
              <CarouselMovie key={movie.id} movie={movie} />
            ))}
          </Carousel>
          <Carousel title="Upcoming Movies">
            {upcomingMovies.map((movie) => (
              <CarouselMovie key={movie.id} movie={movie} />
            ))}
          </Carousel>
          <Carousel title="Weekly Trending Movies">
            {weeklyTrendingMovies.map((movie) => (
              <CarouselMovie key={movie.id} movie={movie} />
            ))}
          </Carousel>
        </>
      )}
    </div>
  );
};

export default Movies;

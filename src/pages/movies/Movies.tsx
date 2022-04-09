import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Carousel from '../../components/carousel/Carousel';
import CarouselMovie from '../../components/carousel/carouselMovie/CarouselMovie';
import { useAppSelector } from '../../store/hooks';
import { loadMoviesPageData } from '../../store/movies/thunk';
import {
  selectDailyTrendingMovies,
  selectPopularMovies,
  selectUpcomingMovies,
  selectWeeklyTrendingMovies,
} from '../../store/movies/selectors';
import styles from './Movies.module.css';
import MobileCarousel from '../../components/MobileCarousel/MobileCarousel';
import useMobile from '../../hooks/useMobile';

const Movies: React.FC = () => {
  const dispatch = useDispatch();
  const isMobile = useMobile();

  const dailyTrendingMovies = useAppSelector(selectDailyTrendingMovies);
  const weeklyTrendingMovies = useAppSelector(selectWeeklyTrendingMovies);
  const popularMovies = useAppSelector(selectPopularMovies);
  const upcomingMovies = useAppSelector(selectUpcomingMovies);

  useEffect(() => {
    dispatch(loadMoviesPageData());
  }, []);

  const renderMobile = () => (
    <>
      <MobileCarousel isMovieCarousel items={dailyTrendingMovies} title="daily trending" />
      <MobileCarousel isMovieCarousel items={popularMovies} title="popular" />
      <MobileCarousel isMovieCarousel items={upcomingMovies} title="upcoming" />
      <MobileCarousel isMovieCarousel items={weeklyTrendingMovies} title="weekly trending" />
    </>
  );

  return (
    <div className={styles.home}>
      {isMobile ? (
        renderMobile()
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

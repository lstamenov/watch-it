import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Carousel from '../../components/carousel/Carousel';
import CarouselMovie from '../../components/carousel/carouselMovie/CarouselMovie';
import { useAppSelector } from '../../store/hooks';
import { loadMoviesPageData } from '../../store/movies/thunk';
import {
  selectDailyTrendingMovies,
  selectPopularMovies,
  selectWeeklyTrendingMovies,
} from '../../store/movies/selectors';
import styles from './Movies.module.css';
import MobileCarousel from '../../components/MobileCarousel/MobileCarousel';
import useMobile from '../../hooks/useMobile';
import { selectLoader } from '../../store/loader/selectors';
import Loader from '../../components/loader/Loader';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';
import { useTranslation } from 'react-i18next';

const Movies: React.FC = () => {
  const dispatch = useDispatch();
  const isMobile = useMobile();
  const isLoading = useAppSelector(selectLoader);
  const { i18n, t } = useTranslation();

  const dailyTrendingMovies = useAppSelector(selectDailyTrendingMovies);
  const weeklyTrendingMovies = useAppSelector(selectWeeklyTrendingMovies);
  const popularMovies = useAppSelector(selectPopularMovies);

  useEffect(() => {
    dispatch(loadMoviesPageData());
  }, [i18n.language]);

  const renderMobile = () => (
    <>
      <MobileCarousel
        isMovieCarousel
        items={dailyTrendingMovies}
        title={t('DAILY_TRENDING_MOVIES')}
      />
      <MobileCarousel
        isMovieCarousel
        items={popularMovies}
        title={t('POPULAR_MOVIES')}
      />
      <MobileCarousel
        isMovieCarousel
        items={weeklyTrendingMovies}
        title={t('WEEKLY_TRENDING_MOVIES')}
      />
    </>
  );

  return (
    <AnimatedPage>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.home}>
          {isMobile ? (
            renderMobile()
          ) : (
            <>
              <Carousel title={t('DAILY_TRENDING_MOVIES')}>
                {dailyTrendingMovies.map((movie) => (
                  <CarouselMovie key={movie.id} movie={movie} />
                ))}
              </Carousel>
              <Carousel title={t('POPULAR_MOVIES')}>
                {popularMovies.map((movie) => (
                  <CarouselMovie key={movie.id} movie={movie} />
                ))}
              </Carousel>
              <Carousel title={t('WEEKLY_TRENDING_MOVIES')}>
                {weeklyTrendingMovies.map((movie) => (
                  <CarouselMovie key={movie.id} movie={movie} />
                ))}
              </Carousel>
            </>
          )}
        </div>
      )}
    </AnimatedPage>
  );
};

export default Movies;

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Carousel from '../../components/carousel/Carousel';
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
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';
import { useTranslation } from 'react-i18next';
import CardsSkeleton from '../../ui/CardsSkeleton/CardsSkeleton';

const Movies: React.FC = () => {
  const dispatch = useDispatch();
  const isMobile = useMobile();
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
      <MobileCarousel isMovieCarousel items={popularMovies} title={t('POPULAR_MOVIES')} />
      <MobileCarousel
        isMovieCarousel
        items={weeklyTrendingMovies}
        title={t('WEEKLY_TRENDING_MOVIES')}
      />
    </>
  );

  return (
    <AnimatedPage>
      <div className={styles.home}>
        {isMobile ? (
          renderMobile()
        ) : (
          <>
            <Carousel title={t('DAILY_TRENDING_MOVIES')}>
              <CardsSkeleton movies={dailyTrendingMovies} />
            </Carousel>
            <Carousel title={t('POPULAR_MOVIES')}>
              <CardsSkeleton movies={popularMovies} />
            </Carousel>
            <Carousel title={t('WEEKLY_TRENDING_MOVIES')}>
              <CardsSkeleton movies={weeklyTrendingMovies} />
            </Carousel>
          </>
        )}
      </div>
    </AnimatedPage>
  );
};

export default Movies;

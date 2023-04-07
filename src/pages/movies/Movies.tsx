import React, { useEffect } from 'react';
import Carousel from '../../components/carousel/Carousel';
import MobileCarousel from '../../components/MobileCarousel/MobileCarousel';
import useMobile from '../../hooks/useMobile';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';
import { useTranslation } from 'react-i18next';
import CardsSkeleton from '../../ui/CardsSkeleton/CardsSkeleton';
import styles from './Movies.module.css';
import { usePopularMovies, useTopRatedMovies, useTrendingMovies } from '../../store';
import { Helmet } from 'react-helmet';

const Movies: React.FC = () => {
  const isMobile = useMobile();
  const { i18n, t } = useTranslation();

  const { trendingMoviesData, loadTrendingMovies } = useTrendingMovies();
  const { popularMoviesData, loadPopularMovies } = usePopularMovies();
  const { topRatedMoviesData, loadTopRatedMovies } = useTopRatedMovies();

  const areTrendingMoviesLoading = trendingMoviesData.status === 'pending';
  const arePopularMoviesLoading = popularMoviesData.status === 'pending';
  const areTopRatedMoviesLoading = topRatedMoviesData.status === 'pending';

  const areMoviesLoading =
    arePopularMoviesLoading || areTopRatedMoviesLoading || areTrendingMoviesLoading;

  useEffect(() => {
    loadTrendingMovies();
    loadPopularMovies();
    loadTopRatedMovies();
  }, [i18n.language]);

  const renderMobile = () => (
    <>
      <MobileCarousel
        isLoading={areTrendingMoviesLoading}
        isMovieCarousel
        items={trendingMoviesData.movies}
        title={t('DAILY_TRENDING_MOVIES')}
      />
      <MobileCarousel
        isLoading={arePopularMoviesLoading}
        isMovieCarousel
        items={popularMoviesData.movies}
        title={t('POPULAR_MOVIES')}
      />
      <MobileCarousel
        isLoading={areTopRatedMoviesLoading}
        isMovieCarousel
        items={topRatedMoviesData.movies}
        title={t('WEEKLY_TRENDING_MOVIES')}
      />
    </>
  );

  return (
    <AnimatedPage isLoading={areMoviesLoading}>
      <Helmet>
        <title>watch365 - {t('MOVIES_TITLE')}</title>
        <meta name="description" content={t('MOVIES_DESCRIPTION') || ''} />
      </Helmet>
      <div className={styles.home}>
        {isMobile ? (
          renderMobile()
        ) : (
          <>
            <Carousel title={t('DAILY_TRENDING_MOVIES')}>
              <CardsSkeleton
                isLoading={areTrendingMoviesLoading}
                movies={trendingMoviesData.movies}
              />
            </Carousel>
            <Carousel title={t('POPULAR_MOVIES')}>
              <CardsSkeleton
                isLoading={arePopularMoviesLoading}
                movies={popularMoviesData.movies}
              />
            </Carousel>
            <Carousel title={t('WEEKLY_TRENDING_MOVIES')}>
              <CardsSkeleton
                isLoading={areTrendingMoviesLoading}
                movies={topRatedMoviesData.movies}
              />
            </Carousel>
          </>
        )}
      </div>
    </AnimatedPage>
  );
};

export default Movies;

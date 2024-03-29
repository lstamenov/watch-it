import React, { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Carousel from '../../components/carousel/Carousel';
import MobileCarousel from '../../components/MobileCarousel/MobileCarousel';
import useMobile from '../../hooks/useMobile';
import { usePopularShows, useTopRatedShows, useTrendingShows } from '../../store';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';
import CardsSkeleton from '../../ui/CardsSkeleton/CardsSkeleton';
import ContentInfo from '../../ui/ContentInfo/ContentInfo';

const Shows: React.FC = () => {
  const { i18n, t } = useTranslation();
  const isMobile = useMobile();

  const { trendingShowsData, loadTrendingShows } = useTrendingShows();
  const { popularShowsData, loadPopularShows } = usePopularShows();
  const { topRatedShowsData, loadTopRatedShows } = useTopRatedShows();

  const areTrendingShowsLoading = trendingShowsData.status === 'pending';
  const arePopularShowsLoading = popularShowsData.status === 'pending';
  const areTopRatedShowsLoading = topRatedShowsData.status === 'pending';

  useEffect(() => {
    loadTrendingShows();
    loadPopularShows();
    loadTopRatedShows();
  }, [i18n.language]);

  const renderMobile = () => (
    <>
      <MobileCarousel
        isLoading={arePopularShowsLoading}
        items={popularShowsData.shows}
        title={t('POPULAR_SHOWS')}
      />
      <MobileCarousel
        isLoading={areTopRatedShowsLoading}
        items={topRatedShowsData.shows}
        title={t('TOP_RATED_SHOWS')}
      />
      <MobileCarousel
        isLoading={areTrendingShowsLoading}
        items={trendingShowsData.shows}
        title={t('TRENDING_SHOWS')}
      />
    </>
  );

  const TopPick = useMemo(() => {
    const topPick = topRatedShowsData.shows.find((show) => show.overview.length > 300);

    if (!topPick) return null;

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { name, backdrop_path, poster_path, genres, overview, id } = topPick;
    const watchLink = `/shows/play/${id}`;

    return (
      <ContentInfo
        title={name}
        backdropPath={backdrop_path}
        posterPath={poster_path}
        genres={genres}
        overview={overview}
        watchLink={watchLink}
      />
    );
  }, [topRatedShowsData]);

  return (
    <AnimatedPage
      isLoading={arePopularShowsLoading || areTopRatedShowsLoading || areTrendingShowsLoading}
    >
      <Helmet>
        <title>watch365 - {t('SHOWS_TITLE')}</title>
        <meta name="description" content={t('SHOWS_DESCRIPTION') || ''} />
      </Helmet>
      <div>
        {TopPick}
        {isMobile ? (
          renderMobile()
        ) : (
          <>
            <Carousel title={t('POPULAR_SHOWS')}>
              <CardsSkeleton isLoading={arePopularShowsLoading} shows={popularShowsData.shows} />
            </Carousel>
            <Carousel title={t('TOP_RATED_SHOWS')}>
              <CardsSkeleton isLoading={areTopRatedShowsLoading} shows={topRatedShowsData.shows} />
            </Carousel>
            <Carousel title={t('TRENDING_SHOWS')}>
              <CardsSkeleton isLoading={areTrendingShowsLoading} shows={trendingShowsData.shows} />
            </Carousel>
          </>
        )}
      </div>
    </AnimatedPage>
  );
};

export default Shows;

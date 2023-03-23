import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Carousel from '../../components/carousel/Carousel';
import CarouselShow from '../../components/carousel/carouselShow/CarouselShow';
import MobileCarousel from '../../components/MobileCarousel/MobileCarousel';
import useMobile from '../../hooks/useMobile';
import { useAppSelector } from '../../store/hooks';
import {
  selectPopularShows,
  selectTopRatedShows,
  selectTrendingShows,
} from '../../store/shows/selectors';
import { loadShowsPageData } from '../../store/shows/thunk';
import { TvShow } from '../../types/types';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';
import styles from './Shows.module.css';

const Shows: React.FC = () => {
  const dispatch = useDispatch();
  const { i18n, t } = useTranslation();
  const isMobile = useMobile();

  useEffect(() => {
    dispatch(loadShowsPageData());
  }, [i18n.language]);

  const popularShows: TvShow[] = useAppSelector(selectPopularShows);
  const topRatedShows: TvShow[] = useAppSelector(selectTopRatedShows);
  const trendingShows: TvShow[] = useAppSelector(selectTrendingShows);

  const renderMobile = () => (
    <>
      <MobileCarousel items={popularShows} title={t('POPULAR_SHOWS')} />
      <MobileCarousel items={topRatedShows} title={t('TOP_RATED_SHOWS')} />
      <MobileCarousel items={trendingShows} title={t('TRENDING_SHOWS')} />
    </>
  );

  return (
    <AnimatedPage>
      <div className={styles.shows}>
        {isMobile ? (
          renderMobile()
        ) : (
          <>
            <Carousel title={t('POPULAR_SHOWS')}>
              {popularShows.map((show, index) => (
                <CarouselShow show={show} key={index} />
              ))}
            </Carousel>
            <Carousel title={t('TOP_RATED_SHOWS')}>
              {topRatedShows.map((show, index) => (
                <CarouselShow key={index} show={show} />
              ))}
            </Carousel>
            <Carousel title={t('TRENDING_SHOWS')}>
              {trendingShows.map((show, index) => (
                <CarouselShow key={index} show={show} />
              ))}
            </Carousel>
          </>
        )}
      </div>
    </AnimatedPage>
  );
};

export default Shows;

import Grid from '@mui/material/Grid';
import React, { useCallback, useMemo } from 'react';
import { Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import CarouselMovie from '../../components/carousel/carouselMovie/CarouselMovie';
import CarouselShow from '../../components/carousel/carouselShow/CarouselShow';
import MobileMovieCard from '../../components/MobileMovieCard/MobileMovieCard';
import MobileShowCard from '../../components/MobileShowCard/MobileShowCard';
import useMobile from '../../hooks/useMobile';
import { useAppSelector } from '../../store/hooks';
import { selectLoader } from '../../store/loader/selectors';
import { Movie, TvShow } from '../../types/types';
import styles from './CardsSkeleton.module.css';

type Props = { movies: Movie[]; shows?: never } | { shows: TvShow[]; movies?: never };

const CardsSkeleton: React.FC<Props> = ({ movies, shows }) => {
  const isLoading = useAppSelector(selectLoader);
  const isMobile = useMobile();

  const DesktopSkeleton = useMemo(
    () => (
      <>
        {Array.from(Array(20), (_, i) => i).map((key) => (
          <Grid key={key}>
            <div className={styles.card} />
          </Grid>
        ))}
      </>
    ),
    [],
  );

  const getMobileCardWrapper = useCallback(
    (children: JSX.Element) => (
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className={styles.carousel}
      >
        {children}
      </Swiper>
    ),
    [],
  );

  const MobileSkeleton = useMemo(
    () =>
      getMobileCardWrapper(
        <>
          {Array.from(Array(20), (_, i) => i).map((key) => (
            <Grid key={key}>
              <div className={styles.mobileCard} />
            </Grid>
          ))}
        </>,
      ),
    [],
  );

  const MobileCards = useMemo(() => {
    if (shows) {
      return getMobileCardWrapper(
        <>
          {shows.map((show) => (
            <SwiperSlide key={show.id}>
              <MobileShowCard show={show} />
            </SwiperSlide>
          ))}
        </>,
      );
    }

    if (movies) {
      return getMobileCardWrapper(
        <>
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <MobileMovieCard movie={movie} />
            </SwiperSlide>
          ))}
        </>,
      );
    }

    if (isLoading) return MobileSkeleton;
  }, [shows, movies]);

  const getContent = () => {
    if (isMobile) return MobileCards;

    if (shows) {
      return shows.map((show) => <CarouselShow key={show.id} show={show} />);
    }

    return movies?.map((movie) => <CarouselMovie key={movie.id} movie={movie} />);
  };

  return isLoading ? DesktopSkeleton : <>{getContent()}</>;
};

export default CardsSkeleton;

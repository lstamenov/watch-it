import React, { useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Movie, TvShow } from '../../types/types';
import { Pagination } from 'swiper';
import styles from './MobileCarousel.module.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Typography } from '@mui/material';
import CardsSkeleton from '../../ui/CardsSkeleton/CardsSkeleton';
import MobileShowCard from '../MobileShowCard/MobileShowCard';
import MobileMovieCard from '../MobileMovieCard/MobileMovieCard';
import { useAppSelector } from '../../store/hooks';
import { selectLoader } from '../../store/loader/selectors';

interface Props {
  title: string;
  items: Movie[] | TvShow[];
  isMovieCarousel?: boolean;
  isOnProfile?: boolean;
}

const MobileCarousel: React.FC<Props> = ({ items, title, isMovieCarousel = false }) => {
  const isLoading = useAppSelector(selectLoader);

  const renderCards = useCallback(
    () => (
      <>
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            {isMovieCarousel ? (
              <MobileMovieCard movie={item as Movie} />
            ) : (
              <MobileShowCard show={item as TvShow} />
            )}
          </SwiperSlide>
        ))}
      </>
    ),
    [items, isMovieCarousel],
  );

  return (
    <div className={styles.wrapper}>
      <Typography className={styles.title} variant="h4" color="white">
        {title}
      </Typography>
      <Swiper
        slidesPerView={2}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className={styles.carousel}
      >
        {isLoading ? <CardsSkeleton movies={[]} /> : renderCards()}
      </Swiper>
    </div>
  );
};

export default MobileCarousel;

import React from 'react';
import { Swiper } from 'swiper/react';
import { Movie, TvShow } from '../../types/types';
import { Pagination } from 'swiper';
import styles from './MobileCarousel.module.css';
import 'swiper/css';
import 'swiper/css/pagination';
import { Typography } from '@mui/material';
import CardsSkeleton from '../../ui/CardsSkeleton/CardsSkeleton';

interface Props {
  title: string;
  items: Movie[] | TvShow[];
  isMovieCarousel?: boolean;
  isOnProfile?: boolean;
}

const MobileCarousel: React.FC<Props> = ({ items, title, isMovieCarousel = false }) => {
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
        {isMovieCarousel ? (
          <CardsSkeleton movies={items as Movie[]} />
        ) : (
          <CardsSkeleton shows={items as TvShow[]} />
        )}
      </Swiper>
    </div>
  );
};

export default MobileCarousel;

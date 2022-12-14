import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Movie, TvShow } from '../../types/types';
import { Pagination } from 'swiper';
import styles from './MobileCarousel.module.css';
import 'swiper/css';
import 'swiper/css/pagination';
import MobileMovieCard from '../MobileMovieCard/MobileMovieCard';
import { Typography } from '@mui/material';
import MobileShowCard from '../MobileShowCard/MobileShowCard';

interface Props {
  title: string;
  items: Movie[] | TvShow[];
  isMovieCarousel?: boolean;
}

const MobileCarousel: React.FC<Props> = ({
  items,
  title,
  isMovieCarousel = false,
}) => {
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
        {items.map((item) => (
          <SwiperSlide>
            {isMovieCarousel ? (
              <MobileMovieCard movie={item as Movie} />
            ) : (
              <MobileShowCard show={item as TvShow} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MobileCarousel;

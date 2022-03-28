import React from 'react';
import { Container, Typography } from '@mui/material';
import styles from './WatchLayout.module.css';
import Carousel from '../../components/carousel/Carousel';
import CarouselMovie from '../../components/carousel/carouselMovie/CarouselMovie';
import { Movie, TvShow } from '../../types/types';
import CarouselShow from '../../components/carousel/carouselShow/CarouselShow';

interface Props {
  posterUrl: string;
  title: string;
  overview: string;
  similar: Movie[] | TvShow[];
  recommended: Movie[] | TvShow[];
  isShow?: boolean;
}

const WatchLayout: React.FC<Props> = ({
  posterUrl,
  title,
  overview,
  similar,
  recommended,
  isShow = false,
  children,
}) => {
  return (
    <div
      style={{
        background: `url(https://image.tmdb.org/t/p/original${posterUrl}) no-repeat fixed 0px 0px/100vw 100vh`,
      }}
    >
      <Container className={styles.container}>
        <Typography
          className={styles.title}
          gutterBottom
          align="center"
          variant="h3"
        >
          {title}
        </Typography>
        {children}
        <Typography className={styles.overview} align="center" variant="h6">
          <Typography className={styles.subTitile} variant="h4" gutterBottom>
            Overview
          </Typography>
          {overview}
        </Typography>
      </Container>
      {isShow ? (
        <>
          <Carousel title="Similar Tv Shows" isTransparent>
            {similar.map((show) => (
              <CarouselShow show={show as TvShow} key={show.id} />
            ))}
          </Carousel>
          <Carousel title="Recommended Tv Shows" isTransparent>
            {recommended.map((show) => (
              <CarouselShow show={show as TvShow} key={show.id} />
            ))}
          </Carousel>
        </>
      ) : (
        <>
          <Carousel title="Similar movies" isTransparent>
            {similar.map((movie) => (
              <CarouselMovie movie={movie as Movie} key={movie.id} />
            ))}
          </Carousel>
          <Carousel title="Recommended movies" isTransparent>
            {recommended.map((movie) => (
              <CarouselMovie movie={movie as Movie} key={movie.id} />
            ))}
          </Carousel>
        </>
      )}
    </div>
  );
};

export default WatchLayout;

import React from 'react';
import { Container, Typography } from '@mui/material';
import styles from './WatchLayout.module.css';
import Carousel from '../../components/carousel/Carousel';
import CarouselMovie from '../../components/carousel/carouselMovie/CarouselMovie';
import { Movie, TvShow } from '../../types/types';
import CarouselShow from '../../components/carousel/carouselShow/CarouselShow';
import useMobile from '../../hooks/useMobile';
import MobileCarousel from '../../components/MobileCarousel/MobileCarousel';

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
  const isMobile = useMobile();

  const renderSuggestedDesktop = () =>
    isShow ? (
      <>
        {similar.length > 0 && (
          <Carousel title="Similar Tv Shows" isTransparent>
            {similar.map((show) => (
              <CarouselShow show={show as TvShow} key={show.id} />
            ))}
          </Carousel>
        )}
        {recommended.length > 0 && (
          <Carousel title="Recommended Tv Shows" isTransparent>
            {recommended.map((show) => (
              <CarouselShow show={show as TvShow} key={show.id} />
            ))}
          </Carousel>
        )}
      </>
    ) : (
      <>
        {similar.length > 0 && (
          <Carousel title="Similar movies" isTransparent>
            {similar.map((movie) => (
              <CarouselMovie movie={movie as Movie} key={movie.id} />
            ))}
          </Carousel>
        )}
        {recommended.length > 0 && (
          <Carousel title="Recommended movies" isTransparent>
            {recommended.map((movie) => (
              <CarouselMovie movie={movie as Movie} key={movie.id} />
            ))}
          </Carousel>
        )}
      </>
    );

  const renderSuggestedMobile = () =>
    isShow ? (
      <>
        {similar.length > 0 && <MobileCarousel title="similar" items={similar} />}
        {recommended.length > 0 && <MobileCarousel title="recommended" items={recommended} />}
      </>
    ) : (
      <>
        {similar.length > 0 && <MobileCarousel isMovieCarousel title="similar" items={similar} />}
        {recommended.length > 0 && (
          <MobileCarousel isMovieCarousel title="recommended" items={recommended} />
        )}
      </>
    );

  return (
    <div
      style={{
        background: `url(https://image.tmdb.org/t/p/original${posterUrl}) no-repeat fixed 0px 0px/100vw 100vh`,
      }}
      className={styles.wrapper}
    >
      <Container className={styles.container}>
        <Typography className={styles.title} gutterBottom align="center" variant="h3">
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
      {isMobile ? renderSuggestedMobile() : renderSuggestedDesktop()}
    </div>
  );
};

export default WatchLayout;

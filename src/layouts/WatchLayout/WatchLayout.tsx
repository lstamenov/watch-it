import React from 'react';
import { Container, Typography } from '@mui/material';
import styles from './WatchLayout.module.css';
import Carousel from '../../components/carousel/Carousel';
import CarouselMovie from '../../components/carousel/carouselMovie/CarouselMovie';
import { Movie, TvShow } from '../../types/types';
import CarouselShow from '../../components/carousel/carouselShow/CarouselShow';
import useMobile from '../../hooks/useMobile';
import MobileCarousel from '../../components/MobileCarousel/MobileCarousel';
import { useTranslation } from 'react-i18next';
import ImageBanner from '../../ui/ImageBanner/ImageBanner';

interface Props {
  title: string;
  overview: string;
  similar: Movie[] | TvShow[];
  recommended: Movie[] | TvShow[];
  isLoading: boolean;
  backDropImage: string;
  isShow?: boolean;
}

const WatchLayout: React.FC<Props> = ({
  title,
  overview,
  similar,
  recommended,
  isLoading,
  backDropImage,
  isShow = false,
  children,
}) => {
  const isMobile = useMobile();
  const { t } = useTranslation();

  const renderSuggestedDesktop = () =>
    isShow ? (
      <>
        {similar.length > 0 && (
          <Carousel title={t('SIMILAR_SHOWS')} isTransparent>
            {similar.map((show) => (
              <CarouselShow show={show as TvShow} key={show.id} />
            ))}
          </Carousel>
        )}
        {recommended.length > 0 && (
          <Carousel title={t('RECOMMENDED_SHOWS')} isTransparent>
            {recommended.map((show) => (
              <CarouselShow show={show as TvShow} key={show.id} />
            ))}
          </Carousel>
        )}
      </>
    ) : (
      <>
        {similar.length > 0 && (
          <Carousel title={t('SIMILAR_MOVIES')} isTransparent>
            {similar.map((movie) => (
              <CarouselMovie movie={movie as Movie} key={movie.id} />
            ))}
          </Carousel>
        )}
        {recommended.length > 0 && (
          <Carousel title={t('RECOMMENDED_MOVIES')} isTransparent>
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
        {similar.length > 0 && (
          <MobileCarousel isLoading={isLoading} title={t('SIMILAR_SHOWS')} items={similar} />
        )}
        {recommended.length > 0 && (
          <MobileCarousel
            isLoading={isLoading}
            title={t('RECOMMENDED_SHOWS')}
            items={recommended}
          />
        )}
      </>
    ) : (
      <>
        {similar.length > 0 && (
          <MobileCarousel
            isLoading={isLoading}
            isMovieCarousel
            title={t('SIMILAR_MOVIES')}
            items={similar}
          />
        )}
        {recommended.length > 0 && (
          <MobileCarousel
            isLoading={isLoading}
            isMovieCarousel
            title={t('RECOMMENDED_MOVIES')}
            items={recommended}
          />
        )}
      </>
    );

  return (
    <div className={styles.wrapper}>
      <ImageBanner img={backDropImage} />
      <Container className={styles.container}>
        <Typography sx={{ color: 'white' }} className={styles.title} align="center" variant="h3">
          {title}
        </Typography>
        {children}
        {overview && (
          <Typography className={styles.overview} align="center" variant="h6">
            <Typography className={styles.subTitile} variant="h4" gutterBottom>
              {t('OVERVIEW')}
            </Typography>
            {overview}
          </Typography>
        )}
      </Container>
      {isMobile ? renderSuggestedMobile() : renderSuggestedDesktop()}
    </div>
  );
};

export default WatchLayout;

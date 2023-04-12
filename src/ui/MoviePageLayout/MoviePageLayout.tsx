/* eslint-disable @typescript-eslint/no-unused-vars */
import { t } from 'i18next';
import React, { useMemo } from 'react';
import Carousel from '../../components/carousel/Carousel';
import CarouselMovie from '../../components/carousel/carouselMovie/CarouselMovie';
import useMobile from '../../hooks/useMobile';
import NotFound from '../../pages/NotFound/NotFound';
import { Movie } from '../../types/types';
import ContentInfo from '../ContentInfo/ContentInfo';
import MobileCarousel from '../../components/MobileCarousel/MobileCarousel';
import styles from './MoviePageLayout.module.css';

interface Props {
  movie: Movie | null;
  similar: Movie[];
  recommendations: Movie[];
  watchLink: string;
}

const MoviePageLayout: React.FC<Props> = ({ movie, similar, recommendations, watchLink }) => {
  const isMobile = useMobile();

  const data = useMemo(() => {
    if (movie) {
      const {
        poster_path: posterPath,
        backdrop_path: backdropPath,
        overview,
        genres,
        original_title: title,
      } = movie;

      return { posterPath, backdropPath, overview, genres, title };
    }

    return null;
  }, [movie]);

  const DesktopCarousel = useMemo(
    () => (
      <div>
        {similar.length > 0 && (
          <Carousel title={t('SIMILAR_MOVIES')} isTransparent>
            {similar.map((mov) => (
              <CarouselMovie movie={mov} key={mov.id} />
            ))}
          </Carousel>
        )}
        {recommendations.length > 0 && (
          <Carousel title={t('RECOMMENDED_MOVIES')} isTransparent>
            {recommendations.map((mov) => (
              <CarouselMovie movie={mov} key={mov.id} />
            ))}
          </Carousel>
        )}
      </div>
    ),
    [similar, recommendations],
  );

  const MobileAppCarousel = useMemo(
    () => (
      <div>
        {similar.length > 0 && (
          <MobileCarousel
            isLoading={false}
            isMovieCarousel
            title={t('SIMILAR_MOVIES')}
            items={similar}
          />
        )}
        {recommendations.length > 0 && (
          <MobileCarousel
            isLoading={false}
            isMovieCarousel
            title={t('RECOMMENDED_MOVIES')}
            items={recommendations}
          />
        )}
      </div>
    ),
    [similar, recommendations],
  );

  if (!movie || !data) return <NotFound />;

  const { posterPath, backdropPath, overview, genres, title } = data;

  return (
    <div className={styles.container}>
      <ContentInfo
        posterPath={posterPath}
        backdropPath={backdropPath}
        overview={overview}
        genres={genres}
        title={title}
        watchLink={watchLink}
      />
      {isMobile ? MobileAppCarousel : DesktopCarousel}
    </div>
  );
};

export default MoviePageLayout;

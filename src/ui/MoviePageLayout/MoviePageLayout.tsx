import React, { useMemo } from 'react';
import NotFound from '../../pages/NotFound/NotFound';
import { Movie } from '../../types/types';
import ContentInfo from '../ContentInfo/ContentInfo';
import ResponsiveCarousel from '../RespnsiveCarousel/ResponsiveCarousel';
import { useTranslation } from 'react-i18next';
import styles from './MoviePageLayout.module.css';

interface Props {
  movie: Movie | null;
  similar: Movie[];
  recommendations: Movie[];
  watchLink: string;
}

const MoviePageLayout: React.FC<Props> = ({ movie, similar, recommendations, ...rest }) => {
  const { t } = useTranslation();

  const data = useMemo(() => {
    if (movie) {
      const {
        poster_path: posterPath,
        backdrop_path: backdropPath,
        overview,
        genres,
        title,
      } = movie;

      return { posterPath, backdropPath, overview, genres, title };
    }

    return null;
  }, [movie]);

  if (!movie || !data) return <NotFound />;

  return (
    <div className={styles.container}>
      <ContentInfo {...data} {...rest} />
      <ResponsiveCarousel movies={recommendations} title={t('RECOMMENDED_MOVIES')} />
      <ResponsiveCarousel movies={similar} title={t('SIMILAR_MOVIES')} />
    </div>
  );
};

export default MoviePageLayout;

import React, { useMemo } from 'react';
import NotFound from '../../pages/NotFound/NotFound';
import ContentInfo from '../ContentInfo/ContentInfo';
import { TvShow } from '../../types/types';
import { useTranslation } from 'react-i18next';
import ResponsiveCarousel from '../RespnsiveCarousel/ResponsiveCarousel';
import styles from './ShowPageLayout.module.css';

interface Props {
  show: TvShow | null;
  similar: TvShow[];
  recommendations: TvShow[];
  watchLink: string;
}

const ShowPageLayout: React.FC<Props> = ({ show, similar, recommendations, ...rest }) => {
  const { t } = useTranslation();

  const data = useMemo(() => {
    if (show) {
      const {
        poster_path: posterPath,
        backdrop_path: backdropPath,
        overview,
        genres,
        name: title,
      } = show;

      return { posterPath, backdropPath, overview, genres, title };
    }

    return null;
  }, [show]);

  if (!show || !data) return <NotFound />;

  return (
    <div className={styles.container}>
      <ContentInfo {...data} {...rest} />
      <ResponsiveCarousel shows={recommendations} title={t('RECOMMENDED_MOVIES')} />
      <ResponsiveCarousel shows={similar} title={t('SIMILAR_MOVIES')} />
    </div>
  );
};

export default ShowPageLayout;

import React, { useEffect, useMemo, useState } from 'react';
import { Container } from '@mui/material';
import InfiniteScrollLayout from '../../layouts/InfiniteScrollLayout/InfiniteScrollLayout';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';
import { Helmet } from 'react-helmet';
import { useTrending } from '../../store/features/trendingSlice/hooks';
import useMobile from '../../hooks/useMobile';
import { useTranslation } from 'react-i18next';
import ContentInfo from '../../ui/ContentInfo/ContentInfo';
import { isShow } from '../../utils/movieUtils';

const Home: React.FC = () => {
  const {
    trending: { trending, status },
    loadTrending,
  } = useTrending();
  const isMobile = useMobile();
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  const isLoading = status === 'pending';

  const onLoadMovies = () => {
    loadTrending(page);
    setPage((oldPage) => oldPage + 1);
  };

  useEffect(() => {
    if (isMobile) {
      onLoadMovies();
    }
  }, []);

  const topMovieData = useMemo(() => {
    const topMovie = trending.find(({ overview }) => overview.length > 300);

    if (!topMovie) return null;

    const { poster_path: posterPath, backdrop_path: backdropPath, overview, genres, id } = topMovie;

    let watchLink: string;
    let title: string;

    if (isShow(topMovie)) {
      watchLink = `/shows/play/${id}`;
      title = topMovie.name;
    } else {
      watchLink = `/movies/play/${id}`;
      title = topMovie.title;
    }

    return { watchLink, posterPath, backdropPath, overview, genres, title };
  }, [trending]);

  const TopTrending = useMemo(() => {
    if (!topMovieData) return null;

    return <ContentInfo {...topMovieData} />;
  }, [trending]);

  return (
    <AnimatedPage isLoading={isLoading}>
      <Helmet>
        <title>Watch365 - {t('HOME_TITLE')}</title>
        <meta
          name="description"
          content="Browse through various movies and shows and find the best match for you"
        />
        <meta name="keywords" content={t('HOME_KEYWORDS') || ''} />
      </Helmet>
      {TopTrending}
      <Container>
        <InfiniteScrollLayout
          isLoading={isLoading}
          movies={trending.slice(1)}
          page={page}
          loadMovies={onLoadMovies}
        />
      </Container>
    </AnimatedPage>
  );
};

export default Home;

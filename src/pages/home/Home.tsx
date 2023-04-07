import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import InfiniteScrollLayout from '../../layouts/InfiniteScrollLayout/InfiniteScrollLayout';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';
import { Helmet } from 'react-helmet';
import styles from './Home.module.css';
import { useTrending } from '../../store/features/trendingSlice/hooks';
import useMobile from '../../hooks/useMobile';
import { useTranslation } from 'react-i18next';

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

  return (
    <AnimatedPage isLoading={isLoading}>
      <Helmet>
        <title>watch365 - {t('HOME_TITLE')}</title>
        <meta
          name="description"
          content="Browse through various movies and shows and find the best match for you"
        />
        <meta name="keywords" content={t('HOME_KEYWORDS') || ''} />
      </Helmet>
      (
      <Container className={styles.home}>
        <InfiniteScrollLayout
          isLoading={isLoading}
          movies={trending}
          page={page}
          loadMovies={onLoadMovies}
        />
      </Container>
      )
    </AnimatedPage>
  );
};

export default Home;

import React, { useEffect, useState } from 'react';
import { Container } from '@mui/material';
import InfiniteScrollLayout from '../../layouts/InfiniteScrollLayout/InfiniteScrollLayout';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';
import { Helmet } from 'react-helmet';
import styles from './Home.module.css';
import { useTrending } from '../../store/features/trendingSlice/hooks';

const Home: React.FC = () => {
  const {
    trending: { trending, status },
    clear,
    loadTrending,
  } = useTrending();

  const [page, setPage] = useState(1);

  const isLoading = status === 'pending';

  const onLoadMovies = () => {
    loadTrending(page);
    setPage((oldPage) => oldPage + 1);
  };

  useEffect(() => {
    return () => {
      clear();
    };
  }, []);

  return (
    <AnimatedPage isLoading={isLoading}>
      <Helmet>
        <title>watch-it - The free streaming platform</title>
        <meta
          name="description"
          content="Browse through various movies and shows and find the best match for you"
        />
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

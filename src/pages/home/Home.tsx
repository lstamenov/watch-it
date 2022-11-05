import React, { useEffect } from 'react';
import { Container, Typography } from '@mui/material';
import { useAppSelector } from '../../store/hooks';
import { useDispatch } from 'react-redux';
import {
  selectTrending,
  selectTrendingPage,
} from '../../store/trending/selectors';
import {
  loadMoreWeeklyTrending,
  loadWeeklyTrending,
} from '../../store/trending/thunk';
import InfiniteScrollLayout from '../../layouts/InfiniteScrollLayout/InfiniteScrollLayout';
import { selectLoader } from '../../store/loader/selectors';
import Loader from '../../components/loader/Loader';
import styles from './Home.module.css';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';
import { Helmet } from 'react-helmet';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useAppSelector(selectLoader);

  const trending = useAppSelector(selectTrending);
  const trendingPage = useAppSelector(selectTrendingPage);

  useEffect(() => {
    dispatch(loadWeeklyTrending());
  }, []);

  return (
    <AnimatedPage>
      <Helmet>
        <title>watch-it - The free streaming platform</title>
        <meta
          name="description"
          content="Browse through various movies and shows and find the best match for you"
        />
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <Container className={styles.home}>
          <Typography className={styles.title} variant="h4">
            find something to watch
          </Typography>
          <InfiniteScrollLayout
            movies={trending}
            page={trendingPage}
            loadMovies={loadMoreWeeklyTrending}
          />
        </Container>
      )}
    </AnimatedPage>
  );
};

export default Home;

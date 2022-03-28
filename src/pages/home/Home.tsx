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
import { selectLoader } from '../../store/loader/selectors';
import Loader from '../../components/loader/Loader';
import InfiniteScrollLayout from '../../layouts/InfiniteScrollLayout/InfiniteScrollLayout';
import styles from './Home.module.css';

const Home: React.FC = () => {
  const dispatch = useDispatch();

  const trending = useAppSelector(selectTrending);
  const isLoading = useAppSelector(selectLoader);
  const trendingPage = useAppSelector(selectTrendingPage);

  useEffect(() => {
    dispatch(loadWeeklyTrending());
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <Container className={styles.home}>
      <Typography className={styles.title} variant="h3">
        What are you up to?
      </Typography>
      <Typography className={styles.title} variant="h4">
        If you do not know browse through our weekly suggestions :)
      </Typography>
      <InfiniteScrollLayout
        movies={trending}
        page={trendingPage}
        loadMovies={loadMoreWeeklyTrending}
      />
    </Container>
  );
};

export default Home;

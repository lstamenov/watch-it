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
import styles from './Home.module.css';
import { selectLoader } from '../../store/loader/selectors';
import Loader from '../../components/loader/Loader';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useAppSelector(selectLoader);

  const trending = useAppSelector(selectTrending);
  const trendingPage = useAppSelector(selectTrendingPage);

  useEffect(() => {
    dispatch(loadWeeklyTrending());
  }, []);

  return (
    isLoading ? <Loader /> : <Container className={styles.home}>
      <Typography className={styles.title} variant="h4">
        find something to watch
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

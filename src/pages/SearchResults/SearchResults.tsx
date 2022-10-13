import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import InfiniteScrollLayout from '../../layouts/InfiniteScrollLayout/InfiniteScrollLayout';
import { useAppSelector } from '../../store/hooks';
import { selectLoader } from '../../store/loader/selectors';
import { selectSearchResults } from '../../store/results/selectors';
import { loadSearchResults } from '../../store/results/thunk';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';
import NotFound from '../NotFound/NotFound';
import styles from './SearchResults.module.css';

const SearchResults: React.FC = () => {
  const searchState = useAppSelector(selectSearchResults);
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const query = searchParams.get('query');
  const isLoading = useAppSelector(selectLoader);
  const [isFirstView, setIsFirstView] = useState(true);

  useEffect(() => {
    dispatch(loadSearchResults(query || ''));
    setTimeout(() => {
      setIsFirstView(false);
    }, 50);
  }, [searchParams]);

  const renderResults = () =>
    isLoading && isFirstView ? (
      <Loader />
    ) : (
      <AnimatedPage>
        <div className={styles.wrapper}>
          <Container>
            <Typography className={styles.title} variant="h4">
              Showing results for: "{searchState.query}"
            </Typography>
            <InfiniteScrollLayout
              movies={searchState.results}
              page={searchState.page}
              loadMovies={loadSearchResults}
              query={query || ''}
            />
          </Container>
        </div>
      </AnimatedPage>
    );

  return searchState.query && query ? renderResults() : <NotFound />;
};

export default SearchResults;

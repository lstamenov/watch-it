import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t, i18n } = useTranslation();
  const [isFirstTimeLoading, setIsFirstTimeLoading] = useState(true);

  useEffect(() => {
    dispatch(loadSearchResults(query || ''));
  }, [searchParams, i18n.language]);

  useEffect(() => {
    if (searchState.page === 1 && searchState.results.length) {
      setIsFirstTimeLoading(false);
    }
  }, [searchState.results]);

  const renderResults = () =>
    isLoading && isFirstTimeLoading ? (
      <Loader />
    ) : (
      <AnimatedPage>
        <div className={styles.wrapper}>
          <Container>
            <Typography className={styles.title} variant="h4">
              {`${t('SHOWING_RESULTS')} ${searchState.query}`}
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

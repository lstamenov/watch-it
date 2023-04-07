import { Container, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import InfiniteScrollLayout from '../../layouts/InfiniteScrollLayout/InfiniteScrollLayout';
import { useSearchResults } from '../../store';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';
import NotFound from '../NotFound/NotFound';
import styles from './SearchResults.module.css';

const SearchResults: React.FC = () => {
  const { searchResults, loadSearchResults } = useSearchResults();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const isLoading = searchResults.status === 'pending';

  const handleLoadMovies = () => {
    loadSearchResults({ query, page });
    setPage((oldPage) => oldPage + 1);
  };

  const renderResults = () => (
    <AnimatedPage isLoading={isLoading}>
      <div className={styles.wrapper}>
        <Container>
          <Typography className={styles.title} variant="h4">
            {`${t('SHOWING_RESULTS')} ${query}`}
          </Typography>
          <InfiniteScrollLayout
            movies={searchResults.results}
            page={page}
            loadMovies={handleLoadMovies}
            isLoading={isLoading}
          />
        </Container>
      </div>
    </AnimatedPage>
  );

  return query ? renderResults() : <NotFound />;
};

export default SearchResults;

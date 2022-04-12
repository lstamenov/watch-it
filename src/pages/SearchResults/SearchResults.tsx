import { Container, Typography } from '@mui/material';
import React from 'react';
import InfiniteScrollLayout from '../../layouts/InfiniteScrollLayout/InfiniteScrollLayout';
import { useAppSelector } from '../../store/hooks';
import { selectSearchResults } from '../../store/results/selectors';
import { loadSearchResults } from '../../store/results/thunk';
import NotFound from '../NotFound/NotFound';
import styles from './SearchResults.module.css';

const SearchResults: React.FC = () => {
  const searchState = useAppSelector(selectSearchResults);

  return searchState.query ? (
    <div className={styles.wrapper}>
      <Container>
        <Typography className={styles.title} variant="h4">
          Showing results for: "{searchState.query}"
        </Typography>
        <InfiniteScrollLayout
          movies={searchState.results}
          page={searchState.page}
          loadMovies={loadSearchResults}
          query={searchState.query}
        />
      </Container>
    </div>
  ) : <NotFound />;
};

export default SearchResults;

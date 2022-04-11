import { Container } from '@mui/material';
import React from 'react';
import InfiniteScrollLayout from '../../layouts/InfiniteScrollLayout/InfiniteScrollLayout';
import { useAppSelector } from '../../store/hooks';
import { selectSearchResults } from '../../store/results/selectors';
import { loadSearchResults } from '../../store/results/thunk';
import styles from './SearchResults.module.css';

const SearchResults: React.FC = () => {
  const searchState = useAppSelector(selectSearchResults);

  return (
   <div className={styles.wrapper}>
      <Container>
        <InfiniteScrollLayout movies={searchState.results} page={searchState.page} loadMovies={loadSearchResults}/>
      </Container>
    </div>
  );
};

export default SearchResults;
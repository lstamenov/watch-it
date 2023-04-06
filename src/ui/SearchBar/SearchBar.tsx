import React, { useMemo, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import styles from './SearchBar.module.css';
import { Backdrop, CircularProgress } from '@mui/material';
import AutoCompleteResult from '../AutoCompleteResult/AutoCompleteResult';
import useMobile from '../../hooks/useMobile';

interface Props {
  onSearch: () => void;
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
  isLoading: boolean;
  results: { title: string; type: string; id: number }[];
  onResultClick: (type: string, id: number) => () => void;
}

const SearchBar: React.FC<Props> = ({
  onSearch,
  onChange,
  onResultClick,
  query,
  inputRef,
  isLoading,
  results,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isMobile = useMobile();

  const SearchResults = useMemo(() => {
    return (
      isFocused &&
      query && (
        <div className={styles.resultsContainer}>
          <Backdrop
            sx={{ zIndex: 99999999, position: 'absolute', backgroundColor: '#9e9e9e' }}
            open={isLoading}
          >
            <CircularProgress sx={{ color: '#b45177' }} />
          </Backdrop>
          {results.map(({ title, id, type }) => (
            <AutoCompleteResult key={id} onClick={onResultClick(type, id)} title={title} />
          ))}
        </div>
      )
    );
  }, [isFocused, query, isLoading, results]);

  return (
    <div>
      <div className={styles.inputWrapper}>
        <div onClick={onSearch} className={styles.iconWrapper}>
          <SearchIcon />
        </div>
        <input
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onSearch();
            }
          }}
          value={query}
          onChange={onChange}
          className={styles.input}
          ref={inputRef}
        />
      </div>
      {!isMobile && SearchResults}
    </div>
  );
};

export default SearchBar;

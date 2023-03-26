import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import styles from './SearchBar.module.css';

interface Props {
  onSearch: () => void;
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const SearchBar: React.FC<Props> = ({ onSearch, onChange, query, inputRef }) => {
  return (
    <>
      <div onClick={onSearch} className={styles.iconWrapper}>
        <SearchIcon />
      </div>
      <input
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
    </>
  );
};

export default SearchBar;

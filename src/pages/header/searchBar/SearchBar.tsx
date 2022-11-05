import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchBar.module.css';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const navigate = useNavigate();
  const [inputClass, setInputClass] = useState(styles.defaultInput);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  const showInput = () => {
    setInputClass(styles.shownInput);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
    setQuery('');
  };

  const onSearchIconClick = () => {
    if (inputClass === styles.shownInput) {
      if (query !== '') {
        navigate(`/results?query=${query}`);
        setQuery('');
      }
    } else {
      showInput();
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        ref={inputRef}
        className={inputClass}
        placeholder="search..."
        onChange={(e) => setQuery(e.currentTarget.value)}
        value={query}
        onBlur={() => {
          setTimeout(() => {
            setInputClass(styles.input);
          }, 100);
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSearchIconClick();
          }
        }}
      />
      <FontAwesomeIcon
        className={styles.icon}
        color="#AA7489"
        fontSize={24}
        icon={faMagnifyingGlass}
        onClick={onSearchIconClick}
      />
    </div>
  );
};

export default SearchBar;

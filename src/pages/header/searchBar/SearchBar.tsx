import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchBar.module.css';
import { useDispatch } from 'react-redux';
import { loadSearchResults } from '../../../store/results/thunk';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputClass, setInputClass] = useState(styles.defaultInput);
  const [query, setQuery] = useState('');

  const onSearchIconClick = () => {
    if (inputClass === styles.defaultInput) {
      setInputClass(styles.shownInput);
    } else if (inputClass === styles.shownInput) {
      setInputClass(styles.input);
      if (query !== '') {
        dispatch(loadSearchResults(query));
        setQuery('');
        navigate('/results');
      }
    } else {
      setInputClass(styles.shownInput);
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        className={inputClass}
        placeholder='search...'
        onChange={(e) => setQuery(e.currentTarget.value)}
        value={query}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            onSearchIconClick();
          }
        }}
      />
      <FontAwesomeIcon 
        className={styles.icon}
        color='#AA7489'
        icon={faMagnifyingGlass}
        onClick={onSearchIconClick}
      />
    </div>
  );
};

export default SearchBar;
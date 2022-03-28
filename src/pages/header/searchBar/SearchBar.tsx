import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchBar.module.css';

const SearchBar: React.FC = () => {
  const [inputClass, setInputClass] = useState(styles.defaultInput);

  const onSearchIconClick = () => {
    if (inputClass === styles.defaultInput) {
      setInputClass(styles.shownInput);
    } else if (inputClass === styles.shownInput) {
      setInputClass(styles.input);
    } else {
      setInputClass(styles.shownInput);
    }
  };

  return (
    <div className={styles.searchBar}>
      <input
        className={inputClass}
        placeholder='Search'
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
import React, { useEffect, useState } from 'react';
import Logo from '../../components/logo/Logo';
import NavButton from '../../components/navButton/NavButton';
import SearchBar from './searchBar/SearchBar';
import styles from './Header.module.css';
import { AppBar, StyledEngineProvider } from '@mui/material';
import { useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const path = useLocation().pathname;

  enum UrlParams {
    MOVIES = 'movies',
    SHOWS = 'shows',
    GENRES = 'genres',
  }

  const [isMoviesClicked, setIsMoviesClicked] = useState(false);
  const [isShowsClicked, setIsShowsClicked] = useState(false);
  const [isGenresClicked, setIsGenresClicked] = useState(false);

  const clearPressedButtons = () => {
    setIsMoviesClicked(false);
    setIsShowsClicked(false);
    setIsGenresClicked(false);
  };

  useEffect(() => {
    clearPressedButtons();

    if (path.includes(UrlParams.MOVIES)) {
      setIsMoviesClicked(true);
    }

    if (path.includes(UrlParams.SHOWS)) {
      setIsShowsClicked(true);
    }

    if (path.includes(UrlParams.GENRES)) {
      setIsGenresClicked(true);
    }
  }, [path]);

  return (
    <StyledEngineProvider injectFirst>
      <AppBar className={styles.header}>
        <div className={styles.main}>
          <Logo />
          <NavButton text='Movies' path='/movies' isClicked={isMoviesClicked} />
          <NavButton text='Shows' path='/shows' isClicked={isShowsClicked} />
          <NavButton text='Genres' path='/genres' isClicked={isGenresClicked} />
        </div>
        <SearchBar />
      </AppBar>
    </StyledEngineProvider>
  );
};


export default Header;
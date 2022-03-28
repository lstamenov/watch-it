import React, { useEffect, useState } from 'react';
import Logo from '../../components/logo/Logo';
import NavButton from '../../components/navButton/NavButton';
import SearchBar from './searchBar/SearchBar';
import { AppBar, Menu, StyledEngineProvider } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styles from './Header.module.css';
import HamburgerItem from '../../components/HamburgerItem/HamburgerItem';

enum UrlParams {
  MOVIES = 'movies',
  SHOWS = 'shows',
  GENRES = 'genres',
}

const Header: React.FC = () => {
  const path = useLocation().pathname;

  const [isMoviesClicked, setIsMoviesClicked] = useState(false);
  const [isShowsClicked, setIsShowsClicked] = useState(false);
  const [isGenresClicked, setIsGenresClicked] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element>();

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

  const items = [
    {
      title: 'Movies',
      path: '/movies',
      isClicked: isMoviesClicked,
    },
    {
      title: 'Shows',
      path: '/shows',
      isClicked: isShowsClicked,
    },
    {
      title: 'Genres',
      path: '/genres',
      isClicked: isGenresClicked,
    },
  ];

  const hanburgerOnClick = () => setAnchorEl(undefined);

  return (
    <StyledEngineProvider injectFirst>
      <AppBar className={styles.header}>
        <div className={styles.main}>
          <Logo />
          <FontAwesomeIcon
            onClick={(e) => setAnchorEl(e.currentTarget)}
            className={styles.menu}
            icon={faBars}
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded="false"
          />
          {items.map((item) => (
            <NavButton
              key={item.title}
              text={item.title}
              path={item.path}
              isClicked={item.isClicked}
            />
          ))}
          <Menu
            PaperProps={{
              style: {
                backgroundColor: '#4F4F4F',
                marginLeft: '-15px',
                boxShadow: 'none',
              },
            }}
            className={styles.dropdown}
            id="basic-menu"
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={() => setAnchorEl(undefined)}
          >
            {items.map((item) => (
              <HamburgerItem
                key={item.title}
                path={item.path}
                title={item.title}
                isClicked={item.isClicked}
                onClick={hanburgerOnClick}
              />
            ))}
          </Menu>
        </div>
        <SearchBar />
      </AppBar>
    </StyledEngineProvider>
  );
};

export default Header;

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
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/user/selectors';

enum UrlParams {
  HOME = '/',
  MOVIES = 'movies',
  SHOWS = 'shows',
  GENRES = 'genres',
  SIGN_IN = 'login',
  SIGN_UP = 'register',
}

const Header: React.FC = () => {
  const path = useLocation().pathname;
  const user: string | null = localStorage.getItem('user');
  const reduxUser = useAppSelector(selectUser);


  const [isHomeClicked, setIsHomeClicked] = useState(false);
  const [isMoviesClicked, setIsMoviesClicked] = useState(false);
  const [isShowsClicked, setIsShowsClicked] = useState(false);
  const [isGenresClicked, setIsGenresClicked] = useState(false);
  const [isSignInClicked, setIsSignInClicked] = useState(false);
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const [anchorEl, setAnchorEl] = useState<Element>();

  const clearPressedButtons = () => {
    setIsMoviesClicked(false);
    setIsShowsClicked(false);
    setIsGenresClicked(false);
    setIsHomeClicked(false);
    setIsSignInClicked(false);
    setIsSignUpClicked(false);
  };

  useEffect(() => {
    clearPressedButtons();

    if (path.includes(UrlParams.MOVIES)) {
      setIsMoviesClicked(true);
    } else if (path.includes(UrlParams.SHOWS)) {
      setIsShowsClicked(true);
    } else if (path.includes(UrlParams.GENRES)) {
      setIsGenresClicked(true);
    } else if (path.includes(UrlParams.SIGN_IN)) {
      setIsSignInClicked(true);
    } else if (path.includes(UrlParams.SIGN_UP)) {
      setIsSignUpClicked(true);
    } else {
      setIsHomeClicked(true);
    }
  }, [path]);

  const items = [
    {
      title: 'Home',
      path: '/',
      isClicked: isHomeClicked,
    },
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

  const guestItems = [
    {
      title: 'Sign In',
      path: '/login',
      isClicked: isSignInClicked,
    },
    {
      title: 'Sign Up',
      path: '/register',
      isClicked: isSignUpClicked,
    },
  ];

  const hanburgerOnClick = () => setAnchorEl(undefined);

  const renderAuthenticatedHeader = () => (
    <>
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
              marginLeft: '-16px',
              boxShadow: 'none',
              width: '150px',
              display: 'flex',
              justifyContent: 'center',
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
    </>
  );

  const renderGuestHeader = () => (
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
        {guestItems.map((item) => (
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
              marginLeft: '-16px',
              boxShadow: 'none',
              width: '150px',
              display: 'flex',
              justifyContent: 'center',
            },
          }}
          className={styles.dropdown}
          id="basic-menu"
          anchorEl={anchorEl}
          open={!!anchorEl}
          onClose={() => setAnchorEl(undefined)}
        >
          {guestItems.map((item) => (
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
  );

  return (
    <StyledEngineProvider injectFirst>
      <AppBar className={styles.header}>
        {(user || reduxUser) ? renderAuthenticatedHeader() : renderGuestHeader()}
      </AppBar>
    </StyledEngineProvider>
  );
};

export default Header;

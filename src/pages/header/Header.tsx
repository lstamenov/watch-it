import React, { useEffect, useReducer } from 'react';
import Logo from '../../components/logo/Logo';
import NavButton from '../../components/navButton/NavButton';
import SearchBar from './searchBar/SearchBar';
import { AppBar, StyledEngineProvider } from '@mui/material';
import { useLocation } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './Header.module.css';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/user/selectors';

enum UrlParams {
  HOME = '/',
  MOVIES = 'movies',
  SHOWS = 'shows',
  GENRES = 'genres',
  SIGN_IN = 'login',
  SIGN_UP = 'register',
  PROFILE = 'profile',
}

interface URLState {
  '/': boolean;
  movies: boolean;
  shows: boolean;
  genres: boolean;
  login: boolean;
  register: boolean;
  profile: boolean;
}

interface Action {
  type: UrlParams;
}

const Header: React.FC = () => {
  const path = useLocation().pathname;
  const user = useAppSelector(selectUser);

  const initialURLState: URLState = {
    '/': false,
    movies: false,
    shows: false,
    genres: false,
    login: false,
    register: false,
    profile: false,
  };

  const urlReducer = (state: URLState, action: Action) => {
    switch (action.type) {
      case UrlParams.HOME:
        return { ...initialURLState, '/': true };
      case UrlParams.MOVIES:
        return { ...initialURLState, movies: true };
      case UrlParams.SHOWS:
        return { ...initialURLState, shows: true };
      case UrlParams.GENRES:
        return { ...initialURLState, genres: true };
      case UrlParams.SIGN_IN:
        return { ...initialURLState, login: true };
      case UrlParams.SIGN_UP:
        return { ...initialURLState, register: true };
      case UrlParams.PROFILE:
        return { ...initialURLState, profile: true };
      default:
        return state;
    }
  };

  const [urlState, dispatch] = useReducer(urlReducer, initialURLState);

  const items = [
    {
      title: 'Home',
      path: '/',
    },
    {
      title: 'Movies',
      path: '/movies',
    },
    {
      title: 'Shows',
      path: '/shows',
    },
    {
      title: 'Genres',
      path: '/genres',
    },
    {
      title: 'Profile',
      path: '/profile',
    },
  ];

  const guestItems = [
    {
      title: 'Sign In',
      path: '/login',
    },
    {
      title: 'Sign Up',
      path: '/register',
    },
  ];

  type Items = typeof guestItems | typeof items;

  const generateItems = (navItems: Items) => {
    return navItems.map(item => {
      const url = item.path;

      if (url.includes(UrlParams.MOVIES)) {
        return { ...item, isClicked: urlState[UrlParams.MOVIES] };
      } else if (url.includes(UrlParams.SHOWS)) {
        return { ...item, isClicked: urlState[UrlParams.SHOWS] };
      } else if (url.includes(UrlParams.GENRES)) {
        return { ...item, isClicked: urlState[UrlParams.GENRES] };
      } else if (url.includes(UrlParams.PROFILE)) {
        return { ...item, isClicked: urlState[UrlParams.PROFILE] };
      } else if (url.includes(UrlParams.SIGN_IN)) {
        return { ...item, isClicked: urlState[UrlParams.SIGN_IN] };
      } else if (url.includes(UrlParams.SIGN_UP)) {
        return { ...item, isClicked: urlState[UrlParams.SIGN_UP] };
      } else {
        return { ...item, isClicked: urlState[UrlParams.HOME] };
      }
    });
  };

  useEffect(() => {
    if (path.includes(UrlParams.MOVIES)) {
      dispatch({ type: UrlParams.MOVIES });
    } else if (path.includes(UrlParams.SHOWS)) {
      dispatch({ type: UrlParams.SHOWS });
    } else if (path.includes(UrlParams.GENRES)) {
      dispatch({ type: UrlParams.GENRES });
    } else if (path.includes(UrlParams.PROFILE)) {
      dispatch({ type: UrlParams.PROFILE });
    } else if (path.includes(UrlParams.SIGN_IN)) {
      dispatch({ type: UrlParams.SIGN_IN });
    } else if (path.includes(UrlParams.SIGN_UP)) {
      dispatch({ type: UrlParams.SIGN_UP });
    } else {
      dispatch({ type: UrlParams.HOME });
    }
  }, [path]);

  const renderAuthenticatedHeader = () => (
    <>
      <div className={styles.main}>
        <Logo />
        {generateItems(items).map((item) => (
          <NavButton
            key={item.title}
            text={item.title}
            path={item.path}
            isClicked={item.isClicked}
          />
        ))}
        <Sidebar items={generateItems(items)} />
      </div>
      <SearchBar />
    </>
  );

  const renderGuestHeader = () => (
    <div className={styles.main}>
      <Logo />
      {generateItems(guestItems).map((item) => (
        <NavButton
          key={item.title}
          text={item.title}
          path={item.path}
          isClicked={item.isClicked}
        />
      ))}
      <Sidebar items={generateItems(guestItems)} />
    </div>
  );

  return (
    <StyledEngineProvider injectFirst>
      <AppBar className={styles.header}>
        {user ? renderAuthenticatedHeader() : renderGuestHeader()}
      </AppBar>
    </StyledEngineProvider>
  );
};

export default Header;

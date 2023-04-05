import React from 'react';
import { useTranslation } from 'react-i18next';
import Logo from '../../components/logo/Logo';
import { AppBar, StyledEngineProvider } from '@mui/material';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import { default as LanguageSelectorUI } from '../../ui/LanguageSelector/LanguageSelector';
import SearchBar from '../../components/SearchBar/SearchBar';
import { default as SearchBarUI } from '../../ui/SearchBar/SearchBar';
import { useUser } from '../../store';
import styles from './Header.module.css';
import HeaderButton from '../../ui/HeaderButton/HeaderButton';

const Header: React.FC = () => {
  const { user } = useUser();
  const { t } = useTranslation();

  const items = [
    {
      title: t('HOME'),
      path: '/',
    },
    {
      title: t('MOVIES'),
      path: '/movies',
    },
    {
      title: t('SHOWS'),
      path: '/shows',
    },
    {
      title: t('GENRES'),
      path: '/genres',
    },
    user.user
      ? {
          title: t('PROFILE'),
          path: '/profile',
        }
      : {
          title: t('SIGN_IN'),
          path: '/login',
        },
  ];

  const renderLanguageSelector = () => (
    <LanguageSelector>{(props) => <LanguageSelectorUI {...props} />}</LanguageSelector>
  );

  const renderSearchBar = () => <SearchBar>{(props) => <SearchBarUI {...props} />}</SearchBar>;

  const renderAuthenticatedHeader = () => (
    <>
      <div className={styles.main}>
        <Logo />
        {items.map((item) => (
          <HeaderButton key={item.path} {...item} />
        ))}
      </div>
      <div className={styles.main}>
        {renderSearchBar()}
        {renderLanguageSelector()}
      </div>
    </>
  );

  return (
    <StyledEngineProvider injectFirst>
      <AppBar className={styles.header}>{renderAuthenticatedHeader()}</AppBar>
    </StyledEngineProvider>
  );
};

export default Header;

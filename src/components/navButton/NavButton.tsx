import React from 'react';
import { ButtonProps } from './types';
import { Button, StyledEngineProvider } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './NavButton.module.css';

const NavButton: React.FC<ButtonProps> = ({ text, path, isClicked = false }) => {
  return (
    <StyledEngineProvider injectFirst>
      <Link to={path}>
        <Button size='large' variant='text' className={isClicked ? styles.clickedBtn : styles.btn}>{text}</Button>
      </Link>
    </StyledEngineProvider>
  );
};

export default NavButton;
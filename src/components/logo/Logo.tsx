import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import styles from './Logo.module.css';

interface Props {
  isVisible: boolean;
}

const Logo: React.FC<Props> = ({ isVisible }) => (
  <Link to="/">
    {isVisible ? (
      <img className={styles.logo} src={logo} alt="company-logo" />
    ) : (
      <div className={styles.logo} />
    )}
  </Link>
);

export default Logo;

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import styles from './Logo.module.css';

const Logo: React.FC = () => (
  <Link to="/">
    <img className={styles.logo} src={logo} alt="company-logo" />
  </Link>
);

export default Logo;

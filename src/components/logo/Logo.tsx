import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/watchit.jpg';
import styles from './Logo.module.css';

const Logo: React.FC = () => (
  <Link className={styles.logo} to="/">
    <img src={logo} alt="company-logo" />
  </Link>
);

export default Logo;

import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/watchit.jpg';

const Logo: React.FC = () => (
  <Link to="/">
    <img src={logo} alt="company-logo" />
  </Link>
);

export default Logo;
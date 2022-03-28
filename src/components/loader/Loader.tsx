import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader: React.FC = () => (
  <div className={styles.loaderWrapper}>
    <RotatingLines width='180' strokeColor='#AA7489' animationDuration='1.5'/>
  </div>
);

export default Loader;
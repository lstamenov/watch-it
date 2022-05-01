import React from 'react';
import styles from './Video.module.css';

interface Props {
  src: string;
}

const Video: React.FC<Props> = ({ src }) => (
  <iframe
    className={styles.player}
    src={`https://www.youtube.com/embed/${src}`}
  />
);

export default Video;

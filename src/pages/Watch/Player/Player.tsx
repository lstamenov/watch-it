import React from 'react';
import styles from './Player.module.css';

interface Props {
  isShow: boolean,
  id: string,
  season?: number,
  episode?: number,
}

const Player: React.FC<Props> = ({ isShow, id, season, episode }) => {
  const movieURL = `https://imdbembed.xyz/movie/imdb/${id}`;
  
  return (
    isShow ? 
      <iframe src={`https://imdbembed.xyz/tv/imdb/${id}-${season}-${episode}`} frameBorder="0" allowFullScreen></iframe>
      : <iframe className={styles.player} src={movieURL} allow='encrypted-media' frameBorder="0" allowFullScreen></iframe>
  );
};

export default Player;
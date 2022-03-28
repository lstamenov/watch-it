import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import { Genre } from '../../types/types';
import styles from './GenreItem.module.css';

interface Props {
  genre: Genre;
  onClick: Function;
}
const GenreItem: React.FC<Props> = ({ genre, onClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const onClickHandler = () => {
    onClick(genre, isClicked);
    setIsClicked(!isClicked);
  };

  return (
    <Grid item>
      <Button
        className={isClicked ? styles.clicked : styles.genre}
        onClick={onClickHandler}
      >
        {genre.name}
      </Button>
    </Grid>
  );
};

export default GenreItem;

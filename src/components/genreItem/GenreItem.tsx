import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import { Genre } from '../../types/types';
import styles from './GenreItem.module.css';

interface Props {
  genre: Genre;
  onClick: Function;
  isActive?: boolean;
}
const GenreItem: React.FC<Props> = ({ genre, onClick, isActive = false }) => {
  const [isClicked, setIsClicked] = useState(isActive);

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

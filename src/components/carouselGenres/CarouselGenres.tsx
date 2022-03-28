import React from 'react';
import { Link } from 'react-router-dom';
import styles from './CarouselGenres.module.css';
import { StyledEngineProvider, Typography } from '@mui/material';
import { Genre } from '../../types/types';

interface Props {
  genres: (Genre | undefined)[],
  isShow: boolean,
}
 
const CarouselGenres: React.FC<Props> = ({ genres, isShow = false }) => {
  return (
    <StyledEngineProvider injectFirst>
      <div className={styles.wrapper}>
        {genres
          .map((genre) => (
            <Link
              to={`genres/${genre?.id}`}
              key={genre?.id}
              className={styles.genre}
            >
              <Typography className={styles.genre}>{genre?.name}</Typography>
            </Link>
          ))
          .filter((genre, index) => isShow ? index <= 0 : index <= 1)}
      </div>
    </StyledEngineProvider>
  );
};

export default CarouselGenres;

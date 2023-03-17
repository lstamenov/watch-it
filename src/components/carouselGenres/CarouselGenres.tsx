import React from 'react';
import { Link } from 'react-router-dom';
import { StyledEngineProvider, Typography } from '@mui/material';
import { Genre } from '../../types/types';
import styles from './CarouselGenres.module.css';

interface Props {
  genres: Genre[];
  numberToShow?: number;
}

const CarouselGenres: React.FC<Props> = ({ genres, numberToShow = 1 }) => {
  const maxGenreLength = 17;

  return (
    <StyledEngineProvider injectFirst>
      <div className={styles.wrapper}>
        {genres
          .map(({ name, id }) =>
            name.length >= maxGenreLength ? { name: name.split(' ')[0], id } : { name, id },
          )
          .map((genre) => (
            <Link
              to="/genres"
              state={genre && { selectedGenre: genre }}
              key={genre?.id}
              className={styles.genre}
            >
              <Typography className={styles.genre}>{genre?.name}</Typography>
            </Link>
          ))
          .filter((_, index) => index <= numberToShow - 1)}
      </div>
    </StyledEngineProvider>
  );
};

export default CarouselGenres;

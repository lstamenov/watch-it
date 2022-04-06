import React, { useState } from 'react';
import { TvShow } from '../../types/types';
import { Card, CardMedia } from '@mui/material';
import { getMoviePosterPath } from '../../utils/movieUtils';
import styles from './MobileShowCard.module.css';
import CarouselDetail from '../carouselDetail/CarouselDetail';
import Modal from '../Modal/Modal';

interface Props {
  show: TvShow;
}

const MobileShowCard: React.FC<Props> = ({ show }) => {
  const [isClicked, setIsClicked] = useState(false);
  
  return (
    <>
      <Modal
        title={show.name}
        isShow
        content={show}
        isClicked={isClicked}
        setIsClicked={setIsClicked}
      >
        <CarouselDetail
          value={
            show.number_of_seasons > 1
              ? `${show.number_of_seasons} Seasons`
              : '1 Season'
          }
        />
        {show.episode_run_time[0] && (
          <CarouselDetail
            value={`${show.episode_run_time[0]
              .toLocaleString()
              .toUpperCase()} min`}
          />
        )}
        <CarouselDetail value={show.original_language.toUpperCase()} />
        <CarouselDetail value={`${show.vote_average}`} />
      </Modal>
      <Card onClick={() => setIsClicked(true)}>
        <CardMedia
          className={styles.card}
          image={getMoviePosterPath(show.poster_path)}
        />
      </Card>
    </>
  );
};

export default MobileShowCard;

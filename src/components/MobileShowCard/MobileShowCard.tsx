import React, { useState } from 'react';
import { TvShow } from '../../types/types';
import { Card, CardMedia } from '@mui/material';
import { getMoviePosterPath } from '../../utils/movieUtils';
import styles from './MobileShowCard.module.css';
import InfoModalMobile from '../../ui/InfoModalMobile/InfoModalMobile';

interface Props {
  show: TvShow;
  isOnProfile?: boolean;
}

const MobileShowCard: React.FC<Props> = ({ show }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClose = () => setIsClicked(false);

  return (
    <>
      <Card onClick={() => setIsClicked(true)}>
        <CardMedia className={styles.card} image={getMoviePosterPath(show.poster_path)} />
      </Card>
      <InfoModalMobile isOpen={isClicked} onClose={handleClose} movie={show} />
    </>
  );
};

export default MobileShowCard;

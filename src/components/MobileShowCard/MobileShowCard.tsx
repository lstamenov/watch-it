import React, { useState } from 'react';
import { TvShow } from '../../types/types';
import { Card, CardMedia, Modal, Box, Typography, Container, Divider, Backdrop, Fade } from '@mui/material';
import { getMoviePosterPath } from '../../utils/movieUtils';
import styles from './MobileShowCard.module.css';
import CarouselGenres from '../carouselGenres/CarouselGenres';
import CarouselDetail from '../carouselDetail/CarouselDetail';
import PlayButton from '../PlayButton/PlayButton';
import ListButton from '../ListButton/ListButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface Props {
  show: TvShow;
}

const MobileShowCard: React.FC<Props> = ({ show }) => {
  const [isClicked, setIsClicked] = useState(false);
  
  return (
      <>
      <Modal
        open={isClicked}
        onClose={() => setIsClicked(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isClicked}>
          <Box className={styles.modal}>
            <FontAwesomeIcon onClick={() => setIsClicked(false)} className={styles.xIcon} color='#b45177' size={'3x'} icon={faXmark} />
            <img className={styles.modalPicture} src={getMoviePosterPath(show.backdrop_path)} alt='backdrop' />
            <Typography className={styles.title} id="modal-modal-title" variant="h5">
              {show.name}
            </Typography>
            <Divider />
            <Container>
              <Typography variant='body1' className={styles.overview}>
                {show.overview.length > 500 ? show.overview.substring(0, 500) + '...' : show.overview}
              </Typography>
              <Divider />
              <CarouselGenres genres={show.genres} numberToShow={3} />
              <Divider />
              <div className={styles.wrapper}>
                <CarouselDetail value={show.number_of_seasons > 1 ? `${show.number_of_seasons} Seasons` : '1 Season'} />
                {show.episode_run_time[0] && <CarouselDetail value={`${show.episode_run_time[0].toLocaleString().toUpperCase()} min`} />}
                <CarouselDetail value={show.original_language.toUpperCase()} />
              </div>
              <div className={styles.container}>
                <PlayButton url={`/shows/play/${show.id}`} />
                <ListButton url={`/shows/${show.id}`} />
              </div>
            </Container>
          </Box>
        </Fade>
      </Modal>
        <Card onClick={() => setIsClicked(true) }>
          <CardMedia className={styles.card} image={getMoviePosterPath(show.poster_path)} />
        </Card>
      </>
  );
};

export default MobileShowCard;
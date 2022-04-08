import { Typography, Divider, Container } from '@mui/material';
import React from 'react';
import { Movie, TvShow } from '../../types/types';
import { getMoviePosterPath } from '../../utils/movieUtils';
import CarouselGenres from '../carouselGenres/CarouselGenres';
import Dialog from '../Dialog/Dialog';
import ListButton from '../ListButton/ListButton';
import PlayButton from '../PlayButton/PlayButton';
import styles from './Modal.module.css';

interface Props {
  title: string;
  content: Movie | TvShow;
  isClicked: boolean;
  setIsClicked: Function;
  isShow?: boolean;
}

const Modal: React.FC<Props> = ({
  title,
  content,
  isClicked,
  setIsClicked,
  children,
  isShow = false,
}) => (
  <Dialog
    isClicked={isClicked}
    setIsClicked={setIsClicked}
    className={styles.modal}
  >
    <img
      className={styles.modalPicture}
      src={getMoviePosterPath(content.backdrop_path)}
      alt="backdrop"
    />
    <Typography className={styles.title} id="modal-modal-title" variant="h5">
      {title}
    </Typography>
    <Divider />
    <Container>
      <Typography variant="body1" className={styles.overview}>
        {content.overview.length > 500
          ? content.overview.substring(0, 500) + '...'
          : content.overview}
      </Typography>
      <Divider />
      <CarouselGenres genres={content.genres} numberToShow={3} />
      <Divider />
      <div className={styles.wrapper}>{children}</div>
      <div className={styles.container}>
        <PlayButton
          url={
            isShow ? `/shows/play/${content.id}` : `/movies/play/${content.id}`
          }
        />
        <ListButton
          url={isShow ? `/shows/${content.id}` : `/movies/${content.id}`}
        />
      </div>
    </Container>
  </Dialog>
);

export default Modal;

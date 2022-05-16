import { Typography, Divider, Container } from '@mui/material';
import React from 'react';
import { Genre } from '../../types/types';
import { getMoviePosterPath } from '../../utils/movieUtils';
import AddToListButton from '../AddToListButton/AddToListButton';
import { default as AddToListButtonUI } from '../../ui/AddToListButton/AddToListButton';
import CarouselGenres from '../carouselGenres/CarouselGenres';
import Dialog from '../Dialog/Dialog';
import ListButton from '../ListButton/ListButton';
import PlayButton from '../PlayButton/PlayButton';
import styles from './Modal.module.css';

interface Props {
  id: number;
  title: string;
  overview: string;
  genres: Genre[];
  backdrop_path: string;
  isClicked: boolean;
  setIsClicked: Function;
  isShow?: boolean;
}

const Modal: React.FC<Props> = ({
  id,
  title,
  overview,
  genres,
  backdrop_path,
  isClicked,
  setIsClicked,
  children,
  isShow = false,
}) => (
  <Dialog
    isClicked={isClicked}
    onClose={() => setIsClicked(false)}
    className={styles.modal}
  >
    <img
      className={styles.modalPicture}
      src={getMoviePosterPath(backdrop_path)}
      alt="backdrop"
    />
    <Typography className={styles.title} id="modal-modal-title" variant="h5">
      {title}
    </Typography>
    <Divider />
    <Container>
      <Typography variant="body1" className={styles.overview}>
        {overview.length > 500
          ? overview.substring(0, 500) + '...'
          : overview}
      </Typography>
      <Divider />
      <CarouselGenres genres={genres} numberToShow={3} />
      <Divider />
      <div className={styles.wrapper}>{children}</div>
      <div className={styles.container}>
        <PlayButton
          url={
            isShow ? `/shows/play/${id}` : `/movies/play/${id}`
          }
        />
        <ListButton
          url={isShow ? `/shows/${id}` : `/movies/${id}`}
        />
        <AddToListButton movieName={title} movieId={id} isMovie={!isShow}>
          {(props) => <AddToListButtonUI {...props} />}
        </AddToListButton>
      </div>
    </Container>
  </Dialog>
);

export default Modal;

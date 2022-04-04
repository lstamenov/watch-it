import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Backdrop,
  Fade,
  Box,
  Typography,
  Divider,
  Container,
  Modal as ContentModal,
} from '@mui/material';
import React from 'react';
import { Movie, TvShow } from '../../types/types';
import { getMoviePosterPath } from '../../utils/movieUtils';
import CarouselGenres from '../carouselGenres/CarouselGenres';
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
  <ContentModal
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
        <FontAwesomeIcon
          onClick={() => setIsClicked(false)}
          className={styles.xIcon}
          color="#b45177"
          size={'3x'}
          icon={faXmark}
        />
        <img
          className={styles.modalPicture}
          src={getMoviePosterPath(content.backdrop_path)}
          alt="backdrop"
        />
        <Typography
          className={styles.title}
          id="modal-modal-title"
          variant="h5"
        >
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
                isShow
                  ? `/shows/play/${content.id}`
                  : `/movies/play/${content.id}`
              }
            />
            <ListButton
              url={isShow ? `/shows/${content.id}` : `/movies/${content.id}`}
            />
          </div>
        </Container>
      </Box>
    </Fade>
  </ContentModal>
);

export default Modal;

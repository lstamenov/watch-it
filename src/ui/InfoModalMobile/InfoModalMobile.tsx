import React, { useMemo } from 'react';
import { AppBar, DialogContent, Drawer, IconButton, Toolbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Movie, TvShow } from '../../types/types';
import { getMoviePosterPath } from '../../utils/movieUtils';
import CarouselGenres from '../../components/carouselGenres/CarouselGenres';
import PlayButton from '../../components/PlayButton/PlayButton';
import AddToListButton from '../../components/AddToListButton/AddToListButton';
import { default as AddToListButtonUI } from '../AddToListButton/AddToListButton';
import styles from './InfoModalMobile.module.css';
import useMobile from '../../hooks/useMobile';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  movie: Movie | TvShow;
}

const InfoModalMobile: React.FC<Props> = ({ isOpen, onClose, movie }) => {
  const isShow = (object: any): object is TvShow => 'name' in object;
  const isMobile = useMobile();

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { title, overview, genres, backdrop_path, id } = useMemo(() => {
    let movieTitle = '';

    if (isShow(movie)) {
      movieTitle = movie.name;
    } else {
      movieTitle = movie.title;
    }

    return {
      title: movieTitle,
      overview: movie.overview,
      genres: movie.genres,
      backdrop_path: movie.backdrop_path,
      id: movie.id,
    };
  }, [movie]);

  const additionalStyleProps: React.CSSProperties = isMobile
    ? {}
    : {
        width: '420px',
        position: 'relative',
        overflow: 'hidden',
      };

  return (
    <Drawer
      PaperProps={{
        style: {
          backgroundColor: '#2d2e2e',
          ...additionalStyleProps,
        },
      }}
      open={isOpen}
    >
      <AppBar sx={{ position: 'relative', backgroundColor: '#4f4f4f' }}>
        <Toolbar>
          <IconButton onClick={onClose} edge="start" color="inherit">
            <ArrowBackIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ padding: 0 }}>
        <img className={styles.picture} src={getMoviePosterPath(backdrop_path)} />
        <Typography className={styles.overview}>{overview}</Typography>
        <div className={styles.actions}>
          <CarouselGenres genres={genres} numberToShow={3} />
        </div>
        <div className={styles.actions}>
          <PlayButton size={75} url={isShow(movie) ? `/shows/play/${id}` : `/movies/play/${id}`} />
          <AddToListButton movieName={title} movieId={id} isMovie={!isShow}>
            {(props) => <AddToListButtonUI size={80} {...props} />}
          </AddToListButton>
        </div>
      </DialogContent>
    </Drawer>
  );
};

export default InfoModalMobile;

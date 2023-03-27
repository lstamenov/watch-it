import Grid from '@mui/material/Grid';
import React, { useMemo } from 'react';
import CarouselMovie from '../../components/carousel/carouselMovie/CarouselMovie';
import CarouselShow from '../../components/carousel/carouselShow/CarouselShow';
import useMobile from '../../hooks/useMobile';
import { useAppSelector } from '../../store/hooks';
import { selectLoader } from '../../store/loader/selectors';
import { Movie, TvShow } from '../../types/types';
import styles from './CardsSkeleton.module.css';

type Props = { movies: Movie[]; shows?: never } | { shows: TvShow[]; movies?: never };

const CardsSkeleton: React.FC<Props> = ({ movies, shows }) => {
  const isLoading = useAppSelector(selectLoader);
  const isMobile = useMobile();

  const DesktopSkeleton = useMemo(
    () => (
      <>
        {Array.from(Array(20), (_, i) => i).map((key) => (
          <Grid key={key}>
            <div className={styles.card} />
          </Grid>
        ))}
      </>
    ),
    [],
  );

  const MobileSkeleton = useMemo(
    () => (
      <>
        {Array.from(Array(20), (_, i) => i).map((key) => (
          <div key={key} className={styles.mobileCard} />
        ))}
      </>
    ),
    [],
  );

  const getContent = () => {
    if (isMobile) return MobileSkeleton;

    if (shows) {
      return shows.map((show) => <CarouselShow key={show.id} show={show} />);
    }

    return movies?.map((movie) => <CarouselMovie key={movie.id} movie={movie} />);
  };

  return isLoading ? DesktopSkeleton : <>{getContent()}</>;
};

export default CardsSkeleton;

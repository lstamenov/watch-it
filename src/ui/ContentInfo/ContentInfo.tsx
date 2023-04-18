import { Typography } from '@mui/material';
import React, { useMemo } from 'react';
import useMobile from '../../hooks/useMobile';
import { getMoviePosterPath } from '../../utils/movieUtils';
import ImageBanner from '../ImageBanner/ImageBanner';
import WatchNowButton from '../WatchNowButton/WatchNowButton';
import styles from './ContentInfo.module.css';

interface Props {
  genres: { id: number; name: string }[];
  backdropPath: string;
  posterPath: string;
  watchLink: string;
  title: string;
  overview: string;
}

const ContentInfo: React.FC<Props> = ({
  genres,
  backdropPath,
  posterPath,
  watchLink,
  title,
  overview,
}) => {
  const isMobile = useMobile();

  const Genres: JSX.Element = useMemo(
    () => (
      <div className={styles.genresContainer}>
        {genres
          .filter((_, index) => index < 2)
          .map(({ id, name }) => (
            <Typography key={id} className={styles.genre}>
              {name}
            </Typography>
          ))}
      </div>
    ),
    [genres],
  );

  return (
    <div>
      <ImageBanner img={getMoviePosterPath(backdropPath)}>
        <div className={styles.content}>
          {!isMobile && (
            <div className={styles.posterWrapper}>
              <div
                className={styles.poster}
                style={{ backgroundImage: `url(${getMoviePosterPath(posterPath)})` }}
              />
            </div>
          )}
          <div className={styles.infoContainer}>
            <Typography className={styles.title} variant="h2">
              {title}
            </Typography>
            {Genres}
            <Typography variant="body1" className={styles.overview}>
              {overview && overview.substring(0, 320) + '..'}
            </Typography>
            <WatchNowButton className={styles.watchButton} watchURL={watchLink} />
          </div>
        </div>
      </ImageBanner>
    </div>
  );
};

export default ContentInfo;

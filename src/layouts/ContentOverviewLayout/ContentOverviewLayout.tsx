import React from 'react';
import { Divider, Typography } from '@mui/material';
import CarouselGenres from '../../components/carouselGenres/CarouselGenres';
import OverviewDetaill from '../../components/OverviewDetaill';
import PlayButton from '../../components/PlayButton/PlayButton';
import { Genre } from '../../types/types';
import AddToListButton from '../../components/AddToListButton/AddToListButton';
import { default as AddToListButtonUI } from '../../ui/AddToListButton/AddToListButton';
import MovieActions from '../../ui/MovieActions/MovieActions';
import { formatMoney } from '../../utils/movieUtils';
import styles from './ContentOverviewLayout.module.css';

interface Props {
  id: number;
  title: string;
  overview: string;
  genres: Genre[];
  fields: {
    field: string;
    value: string;
  }[];
  isShow?: boolean;
}

const ContentOverviewLayout: React.FC<Props> = ({
  id,
  title,
  overview,
  genres,
  fields,
  isShow = false,
}) => (
  <div className={styles.container}>
    <div>
    <Typography color='white' textAlign="center" variant="h4">
      {title}
    </Typography>
    <Divider />
    <CarouselGenres genres={genres} numberToShow={4} />
    <MovieActions>
      <PlayButton url={isShow ? `/shows/play/${id}` : `/movies/play/${id}`} />
      <AddToListButton movieId={id} movieName={title} isMovie={!isShow}>
        {(props) => <AddToListButtonUI {...props} />}
      </AddToListButton>
    </MovieActions>
    </div>
    <Divider />
    <div>
      {fields.map((field) =>
        field.field === 'Budget' || field.field === 'Revenue' ? (
          <OverviewDetaill
            key={field.value}
            field={field.field}
            value={formatMoney(field.value)}
          />
        ) : (
          <OverviewDetaill key={field.value} {...field} />
        ),
      )}
    </div>
    <Divider />
    <div>
      <Typography
        className={styles.title}
        textAlign="center"
        gutterBottom
        variant="h5"
      >
        Overview
      </Typography>
      <Typography textAlign="center" className={styles.overview}>
        {overview}
      </Typography>
    </div>
  </div>
);

export default ContentOverviewLayout;

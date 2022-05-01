import { Divider, Typography } from '@mui/material';
import React from 'react';
import CarouselGenres from '../../components/carouselGenres/CarouselGenres';
import OverviewDetaill from '../../components/OverviewDetaill';
import { Genre } from '../../types/types';
import Video from '../../ui/Video/Video';
import { formatMoney } from '../../utils/movieUtils';
import styles from './ContentOverviewLayout.module.css';

interface Props {
  title: string;
  overview: string;
  genres: Genre[];
  fields: {
    field: string;
    value: string;
  }[];
  trailer?: string;
}

const ContentOverviewLayout: React.FC<Props> = ({
  title,
  overview,
  genres,
  fields,
  trailer,
}) => (
  <div className={styles.container}>
    <div>
    <Typography color='white' textAlign="center" variant="h4">
      {title}
    </Typography>
    <Divider />
    <CarouselGenres genres={genres} numberToShow={4} />
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
      {trailer && <Video src={trailer} />}
    </div>
  </div>
);

export default ContentOverviewLayout;

import { Avatar, Card, Grid, Typography } from '@mui/material';
import React from 'react';
import { Actor } from '../../types/types';
import { getMoviePosterPath } from '../../utils/movieUtils';
import styles from './ActorCard.module.css';

interface Props {
  actor: Actor;
}

export const ActorCard: React.FC<Props> = ({ actor }) => {
  return (
    <Grid item>
      <Card className={styles.card} elevation={5}>
        <Avatar className={styles.img} src={getMoviePosterPath(actor.profile_path)} />
        <div className={styles.wrapper}>
          <Typography color="white" variant="h5">
            {actor.name}
          </Typography>
          <Typography color="white" variant="h6">
            as {actor.character}
          </Typography>
        </div>
      </Card>
    </Grid>
  );
};

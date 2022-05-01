import { Typography } from '@mui/material';
import React from 'react';
import { Actor } from '../../types/types';
import { ActorCard } from '../ActorCard/ActorCard';
import { CastLayout } from '../CastLayout/CastLayout';
import Video from '../Video/Video';
import styles from './OverviewLayout.module.css';

interface Props {
  cast: Actor[];
  trailer?: string;
}

const OverviewLayout: React.FC<Props> = ({ trailer, cast }) => {
  return (
    <div className={styles.container}>
      <Typography
        textAlign='center'
        color='white'
        variant='h4'
        gutterBottom
        textTransform='uppercase'
      >
        Trailer
      </Typography>
      {trailer && <Video src={trailer} />}
      <Typography
        textAlign='center'
        color='white'
        variant='h4'
        gutterBottom
        textTransform='uppercase'
      >
        Cast
      </Typography>
      <CastLayout>
        {cast.map(actor => <ActorCard actor={actor} />)}
      </CastLayout>
    </div>
  );
};

export default OverviewLayout;
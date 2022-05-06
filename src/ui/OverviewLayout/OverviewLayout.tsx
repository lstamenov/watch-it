import React from 'react';
import { Actor, ProdcutionCompany } from '../../types/types';
import { ActorCard } from '../ActorCard/ActorCard';
import { CastLayout } from '../CastLayout/CastLayout';
import Video from '../Video/Video';
import styles from './OverviewLayout.module.css';
import ProductionCompany from '../ProductionCompany/ProductionCompany';
import OverviewDetailLayout from '../OverviewDetailLayout/OverviewDetailLayout';

interface Props {
  cast: Actor[];
  companies: ProdcutionCompany[];
  trailer?: string;
}

const OverviewLayout: React.FC<Props> = ({ trailer, cast, companies }) => {
  return (
    <div className={styles.container}>
      {trailer && (
        <OverviewDetailLayout title="trailer">
          {<Video src={trailer} />}
        </OverviewDetailLayout>
      )}
      <OverviewDetailLayout title="cast">
        <CastLayout>
          {cast.filter((_, index) => index <= 9).map((actor, index) => (
            <ActorCard key={index} actor={actor} />
          ))}
        </CastLayout>
      </OverviewDetailLayout>
      {companies.length > 0 && (
        <OverviewDetailLayout title="Production companies">
          {companies.map((company) => (
            <ProductionCompany key={company.id} company={company} />
          ))}
        </OverviewDetailLayout>
      )}
    </div>
  );
};

export default OverviewLayout;

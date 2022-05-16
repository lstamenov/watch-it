import React from 'react';
import Carousel from '../../components/carousel/Carousel';
import CarouselShow from '../../components/carousel/carouselShow/CarouselShow';
import MobileCarousel from '../../components/MobileCarousel/MobileCarousel';
import useMobile from '../../hooks/useMobile';
import BackgroundLayout from '../../layouts/BackgroundLayout';
import ContentOverviewLayout from '../../layouts/ContentOverviewLayout/ContentOverviewLayout';
import PosterLayout from '../../layouts/PosterLayout/PosterLayout';
import { TvShow } from '../../types/types';
import { getMoviePosterPath } from '../../utils/movieUtils';
import OverviewLayout from '../OverviewLayout/OverviewLayout';
import styles from './ShowLayout.module.css';

interface Props {
  show: TvShow;
  similarShows: TvShow[];
  recommendedShows: TvShow[];
}

const ShowLayout: React.FC<Props> = ({
  show,
  similarShows,
  recommendedShows,
}) => {
  const fields = [
    {
      field: 'Runtime',
      value: `${show.episode_run_time} minutes`,
    },
    {
      field: 'Rating',
      value: String(show.vote_average),
    },
    {
      field: 'Release date',
      value: show.first_air_date,
    },
    {
      field: 'Seasons',
      value: `${show.number_of_seasons}`,
    },
    {
      field: 'Country',
      value: `${show.origin_country}`,
    },
  ];

  const isMobile = useMobile();

  const renderSuggestedDesktop = () => (
    <>
      {similarShows.length > 0 && (
        <Carousel title="Similar Tv Shows" isTransparent>
          {similarShows.map((s) => (
            <CarouselShow show={s} key={s.id} />
          ))}
        </Carousel>
      )}
      {recommendedShows.length > 0 && (
        <Carousel title="Recommended Tv Shows" isTransparent>
          {recommendedShows.map((s) => (
            <CarouselShow show={s} key={s.id} />
          ))}
        </Carousel>
      )}
    </>
  );

  const renderSuggestedMobile = () => (
    <>
      {similarShows.length > 0 && (
        <MobileCarousel title="similar" items={similarShows} />
      )}
      {recommendedShows.length > 0 && (
        <MobileCarousel title="recommended" items={recommendedShows} />
      )}
    </>
  );

  return (
    <BackgroundLayout path={show.backdrop_path}>
      <div className={styles.container}>
        <PosterLayout image={getMoviePosterPath(show?.poster_path)}>
          <ContentOverviewLayout
            id={show.id}
            genres={show.genres}
            overview={show.overview}
            title={show.name}
            fields={fields}
            isShow
          />
        </PosterLayout>
        <OverviewLayout
          companies={show.production_companies}
          cast={show.cast}
          trailer={show.trailer?.key}
        />
      </div>
      {isMobile ? renderSuggestedMobile() : renderSuggestedDesktop()}
    </BackgroundLayout>
  );
};

export default ShowLayout;

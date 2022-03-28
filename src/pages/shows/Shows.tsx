import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Carousel from '../../components/carousel/Carousel';
import CarouselShow from '../../components/carousel/carouselShow/CarouselShow';
import Loader from '../../components/loader/Loader';
import { useAppSelector } from '../../store/hooks';
import { selectLoader } from '../../store/loader/selectors';
import {
  selectPopularShows,
  selectTopRatedShows,
  selectTrendingShows,
} from '../../store/shows/selectors';
import { loadShowsPageData } from '../../store/shows/thunk';
import { TvShow } from '../../types/types';
import styles from './Shows.module.css';

const Shows: React.FC = () => {
  const dispatch = useDispatch();

  const isLoading = useAppSelector(selectLoader);

  useEffect(() => {
    dispatch(loadShowsPageData());
  }, []);

  const popularShows: TvShow[] = useAppSelector(selectPopularShows);
  const topRatedShows: TvShow[] = useAppSelector(selectTopRatedShows);
  const trendingShows: TvShow[] = useAppSelector(selectTrendingShows);

  return (
    <div className={styles.shows}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Carousel title="Popular">
            {popularShows.map((show, index) => (
              <CarouselShow show={show} key={index} />
            ))}
          </Carousel>
          <Carousel title="Top rated">
            {topRatedShows.map((show, index) => (
              <CarouselShow key={index} show={show} />
            ))}
          </Carousel>
          <Carousel title="Trending">
            {trendingShows.map((show, index) => (
              <CarouselShow key={index} show={show} />
            ))}
          </Carousel>
        </>
      )}
    </div>
  );
};

export default Shows;

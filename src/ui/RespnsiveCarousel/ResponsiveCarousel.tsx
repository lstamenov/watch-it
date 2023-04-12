import React, { useMemo } from 'react';
import Carousel from '../../components/carousel/Carousel';
import CarouselMovie from '../../components/carousel/carouselMovie/CarouselMovie';
import CarouselShow from '../../components/carousel/carouselShow/CarouselShow';
import MobileCarousel from '../../components/MobileCarousel/MobileCarousel';
import useMobile from '../../hooks/useMobile';
import { Movie, TvShow } from '../../types/types';

type OptionalProps = { movies: Movie[]; shows?: never } | { shows: TvShow[]; movies?: never };

type Props = { title: string } & OptionalProps;
const ResponsiveCarousel: React.FC<Props> = ({ movies, shows, title }) => {
  const isMobile = useMobile();

  const MovieCarousel = useMemo(() => {
    if (!movies || movies.length === 0) return null;

    if (isMobile)
      return <MobileCarousel isLoading={false} isMovieCarousel title={title} items={movies} />;

    return (
      <Carousel title={title} isTransparent>
        {movies.map((movie) => (
          <CarouselMovie movie={movie} key={movie.id} />
        ))}
      </Carousel>
    );
  }, [movies]);

  const ShowCarousel = useMemo(() => {
    if (!shows || shows.length === 0) return null;

    if (isMobile) return <MobileCarousel isLoading={false} title={title} items={shows} />;

    return (
      <Carousel title={title} isTransparent>
        {shows.map((show) => (
          <CarouselShow show={show} key={show.id} />
        ))}
      </Carousel>
    );
  }, [movies]);

  return movies ? MovieCarousel : ShowCarousel;
};

export default ResponsiveCarousel;

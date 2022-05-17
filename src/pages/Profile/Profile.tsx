import React from 'react';
import ProfileLayout from '../../components/ProfileLayout/ProfileLayout';
import { default as ProfileLayoutUI } from '../../ui/ProfileLayout/ProfileLayout';
import Carousel from '../../components/carousel/Carousel';
import CarouselMovie from '../../components/carousel/carouselMovie/CarouselMovie';
import CarouselShow from '../../components/carousel/carouselShow/CarouselShow';
import MobileCarousel from '../../components/MobileCarousel/MobileCarousel';
import useMobile from '../../hooks/useMobile';
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/user/selectors';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';
import Page from '../../ui/Page/Page';

const Profile: React.FC = () => {
  const user = useAppSelector(selectUser);
  const isMobile = useMobile();

  const renderMobileCarousel = () => {
    return (
      <>
        {user && user.list.movies.length > 1 && (
          <MobileCarousel
            isMovieCarousel
            title="your movie list"
            items={user?.list.movies}
          />
        )}
        {user && user.list.shows.length > 1 && (
          <MobileCarousel title="your show list" items={user?.list.shows} />
        )}
      </>
    );
  };

  const renderDesktopCarousel = () => {
    return user ? (
      <>
        {
          user.list.movies.length > 0 && <Carousel title="your movie list">
            {user.list.movies.map((movie) => (
              <CarouselMovie key={movie.id} movie={movie} />
            ))}
          </Carousel>
        }
        {
          user.list.shows.length > 0 && <Carousel title="your show list">
            {user.list.shows.map((show) => (
              <CarouselShow key={show.id} show={show} />
            ))}
          </Carousel>
        }
      </>
    ) : null;
  };

  const renderCarousels = () =>
    isMobile ? renderMobileCarousel() : renderDesktopCarousel();

  return (
    <AnimatedPage>
      <Page>
        {user && (
          <ProfileLayout username={user.username} avatar={user.avatar}>
            {(props) => <ProfileLayoutUI {...props} />}
          </ProfileLayout>
        )}
        {renderCarousels()}
      </Page>
    </AnimatedPage>
  );
};

export default Profile;

import React, { useEffect } from 'react';
import ProfileLayout from '../../components/ProfileLayout/ProfileLayout';
import { default as ProfileLayoutUI } from '../../ui/ProfileLayout/ProfileLayout';
import Carousel from '../../components/carousel/Carousel';
import CarouselMovie from '../../components/carousel/carouselMovie/CarouselMovie';
import CarouselShow from '../../components/carousel/carouselShow/CarouselShow';
import MobileCarousel from '../../components/MobileCarousel/MobileCarousel';
import useMobile from '../../hooks/useMobile';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';
import Page from '../../ui/Page/Page';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../store';

const Profile: React.FC = () => {
  const { user, authenticate } = useUser();
  const isMobile = useMobile();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    authenticate();
  }, [i18n.language]);

  const renderMobileCarousel = () => {
    return (
      <>
        {user.user && user.user.list.movies.length > 1 && (
          <MobileCarousel
            isLoading={user.status === 'pending'}
            isMovieCarousel
            title={t('YOUR_MOVIES_LIST')}
            items={user.user.list.movies}
          />
        )}
        {user.user && user.user.list.shows.length > 1 && (
          <MobileCarousel
            isLoading={user.status === 'pending'}
            title={t('YOUR_SHOWS_LIST')}
            items={user.user.list.shows}
          />
        )}
      </>
    );
  };

  const renderDesktopCarousel = () => {
    return user.user ? (
      <>
        {user.user.list.movies.length > 0 && (
          <Carousel title={t('YOUR_MOVIES_LIST')}>
            {user.user.list.movies.map((movie) => (
              <CarouselMovie isOnProfile key={movie.id} movie={movie} />
            ))}
          </Carousel>
        )}
        {user.user.list.shows.length > 0 && (
          <Carousel title={t('YOUR_SHOWS_LIST')}>
            {user.user.list.shows.map((show) => (
              <CarouselShow isOnProfile key={show.id} show={show} />
            ))}
          </Carousel>
        )}
      </>
    ) : null;
  };

  const renderCarousels = () => (isMobile ? renderMobileCarousel() : renderDesktopCarousel());

  return (
    <AnimatedPage isLoading={user.status === 'pending'}>
      <Page>
        {user.user && (
          <ProfileLayout username={user.user.username} avatar={user.user.avatarURL}>
            {(props) => <ProfileLayoutUI {...props} />}
          </ProfileLayout>
        )}
        {renderCarousels()}
      </Page>
    </AnimatedPage>
  );
};

export default Profile;

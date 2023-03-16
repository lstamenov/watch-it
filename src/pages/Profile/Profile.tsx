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
import { useAppSelector } from '../../store/hooks';
import { selectUser } from '../../store/user/selectors';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { auth } from '../../store/user/thunk';

const Profile: React.FC = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useDispatch();
  const isMobile = useMobile();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(auth());
  }, [i18n.language]);

  const renderMobileCarousel = () => {
    return (
      <>
        {user && user.list.movies.length > 1 && (
          <MobileCarousel isMovieCarousel title={t('YOUR_MOVIES_LIST')} items={user?.list.movies} />
        )}
        {user && user.list.shows.length > 1 && (
          <MobileCarousel title={t('YOUR_SHOWS_LIST')} items={user?.list.shows} />
        )}
      </>
    );
  };

  const renderDesktopCarousel = () => {
    return user ? (
      <>
        {user.list.movies.length > 0 && (
          <Carousel title={t('YOUR_MOVIES_LIST')}>
            {user.list.movies.map((movie) => (
              <CarouselMovie isOnProfile key={movie.id} movie={movie} />
            ))}
          </Carousel>
        )}
        {user.list.shows.length > 0 && (
          <Carousel title={t('YOUR_SHOWS_LIST')}>
            {user.list.shows.map((show) => (
              <CarouselShow isOnProfile key={show.id} show={show} />
            ))}
          </Carousel>
        )}
      </>
    ) : null;
  };

  const renderCarousels = () => (isMobile ? renderMobileCarousel() : renderDesktopCarousel());

  return (
    <AnimatedPage>
      <Page>
        {user && (
          <ProfileLayout username={user.username} avatar={user.avatarURL}>
            {(props) => <ProfileLayoutUI {...props} />}
          </ProfileLayout>
        )}
        {renderCarousels()}
      </Page>
    </AnimatedPage>
  );
};

export default Profile;

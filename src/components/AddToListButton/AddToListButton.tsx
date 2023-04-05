import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ToastContext } from '../../providers/ToastProvider';
import { useUser } from '../../store';

interface Props {
  movieId: number;
  movieName: string;
  isMovie?: boolean;
  isOnProfile?: boolean;
  isMovieAddedToList?: boolean;
  children: (props: {
    onClick: () => void;
    isOnProfile?: boolean;
    isMovieAddedToList?: boolean;
    isEnabled?: boolean;
  }) => JSX.Element;
}

const AddToListButton: React.FC<Props> = ({
  movieId,
  isMovie = true,
  isOnProfile = false,
  isMovieAddedToList,
  movieName,
  children,
}) => {
  const {
    user,
    addMovieToList,
    addShowToList,
    removeMovieFromList,
    removeShowFromList,
    authenticate,
  } = useUser();
  const { t } = useTranslation('');
  const { pushMessage } = useContext(ToastContext);

  const reloadMovies = () => setTimeout(() => authenticate(true), 10);

  const handleAdd = () => {
    if (isMovieAddedToList) {
      pushMessage(t('MOVIE_ALREADY_ADDED_MESSAGE', { movie: movieName }), 'warning');
      return;
    }

    if (isMovie) {
      addMovieToList(movieId);
    } else {
      addShowToList(movieId);
    }
    pushMessage(t('MOVIE_ADDED_MESSAGE', { movie: movieName }), 'success');
    reloadMovies();
  };

  const handleRemove = () => {
    if (isMovie) {
      removeMovieFromList(movieId);
    } else {
      removeShowFromList(movieId);
    }
    reloadMovies();
  };

  return children({
    onClick: isOnProfile ? handleRemove : handleAdd,
    isOnProfile,
    isMovieAddedToList,
    isEnabled: !!user,
  });
};

export default AddToListButton;

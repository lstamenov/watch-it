import React from 'react';
import { useDispatch } from 'react-redux';
import { addMovie, addShow, removeMovie, removeShow } from '../../store/user/thunk';

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
  }) => JSX.Element;
}

const AddToListButton: React.FC<Props> = ({
  movieId,
  movieName,
  isMovie = true,
  isOnProfile = false,
  isMovieAddedToList,
  children,
}) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (isMovie) {
      dispatch(addMovie(movieId, movieName));
    } else {
      dispatch(addShow(movieId, movieName));
    }
  };

  const handleRemove = () => {
    if (isMovie) {
      dispatch(removeMovie(movieId, movieName));
    } else {
      dispatch(removeShow(movieId, movieName));
    }
  };

  return children({
    onClick: isOnProfile ? handleRemove : handleAdd,
    isOnProfile,
    isMovieAddedToList,
  });
};

export default AddToListButton;

import React from 'react';
import { useDispatch } from 'react-redux';
import { addMovie, addShow, removeMovie, removeShow } from '../../store/user/thunk';

interface Props {
  movieId: number;
  movieName: string;
  isMovie?: boolean;
  isOnProfile?: boolean;
  children: (props: {
    onClick: () => void;
    isOnProfile?: boolean;
  }) => JSX.Element;
}

const AddToListButton: React.FC<Props> = ({
  movieId,
  movieName,
  isMovie = true,
  isOnProfile = false,
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
  });
};

export default AddToListButton;

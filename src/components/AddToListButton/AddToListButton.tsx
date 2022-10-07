import React from 'react';
import { useDispatch } from 'react-redux';
import { addMovie, addShow } from '../../store/user/thunk';

interface Props {
  movieId: number;
  movieName: string;
  isMovie?: boolean;
  children: (props: {
    onClick: () => void;
  }) => JSX.Element;
}

const AddToListButton: React.FC<Props> = ({ movieId, movieName, isMovie = true, children }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (isMovie) {
      dispatch(addMovie(movieId, movieName));
    } else {
      dispatch(addShow(movieId));
    }
  };
  
  return children({
    onClick: handleClick,
  });
};

export default AddToListButton;

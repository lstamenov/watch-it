import React from 'react';
import { useDispatch } from 'react-redux';
import { enqueMessage } from '../../store/toasts/actions';
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
    dispatch(enqueMessage(`Successfully added ${movieName} to your list`));
    if (isMovie) {
      dispatch(addMovie(movieId));
    } else {
      dispatch(addShow(movieId));
    }
  };
  
  return children({
    onClick: handleClick,
  });
};

export default AddToListButton;

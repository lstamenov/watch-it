import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { selectLoader } from '../../store/loader/selectors';
import { selectCurrentShow, selectShowRecommendations, selectSimilarShows } from '../../store/watch/selectors';
import { loadCurrentShow, loadSuggestedShows } from '../../store/watch/thunk';
import { TvShow } from '../../types/types';

interface Props {
  children: (props: {
    isLoading: boolean,
    show: TvShow | null,
    similarShows: TvShow[],
    recommendedShows: TvShow[],
  }) => JSX.Element;
}

const ShowLayout: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();
  const id: number = Number(useParams().id);
  const isLoading: boolean = useAppSelector(selectLoader);
  const show: TvShow | null = useAppSelector(selectCurrentShow);
  const similarShows: TvShow[] = useAppSelector(selectSimilarShows);
  const recommendedShows: TvShow[] = useAppSelector(selectShowRecommendations);

  useEffect(() => {
    dispatch(loadCurrentShow(id));
  }, [id]);

  useEffect(() => {
    dispatch(loadSuggestedShows());
  }, [show]);

  return children({
    isLoading,
    show,
    similarShows,
    recommendedShows,
  });
};

export default ShowLayout;

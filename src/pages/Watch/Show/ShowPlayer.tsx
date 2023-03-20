import { StyledEngineProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import WatchLayout from '../../../layouts/WatchLayout/WatchLayout';
import { useAppSelector } from '../../../store/hooks';
import {
  selectCurrentShow,
  selectSimilarShows,
  selectShowRecommendations,
} from '../../../store/watch/selectors';
import { loadCurrentShow, loadSuggestedShows } from '../../../store/watch/thunk';
import AnimatedPage from '../../../ui/AnimatedPage/AnimatedPage';
import { getMoviePosterPath } from '../../../utils/movieUtils';
import Player from '../Player/Player';

const ShowPlayer: React.FC = () => {
  const [isCorrectId, setIsCorrectId] = useState(false);

  const showId = useParams().id;
  const show = useAppSelector(selectCurrentShow);
  const similar = useAppSelector(selectSimilarShows);
  const recommended = useAppSelector(selectShowRecommendations);

  const dispatch = useDispatch();

  useEffect(() => {
    const id = showId ? parseInt(showId) : -1;

    if (id !== -1) {
      setIsCorrectId(true);
      dispatch(loadCurrentShow(id));
    } else {
      setIsCorrectId(false);
    }
  }, [showId]);

  useEffect(() => {
    dispatch(loadSuggestedShows());
  }, [show]);

  return (
    <AnimatedPage>
      {isCorrectId && show ? (
        <StyledEngineProvider injectFirst>
          <WatchLayout
            similar={similar}
            recommended={recommended}
            overview={show.overview}
            posterUrl={getMoviePosterPath(show.backdrop_path)}
            title={show.name}
            isShow
          >
            <Player
              isShow={true}
              id={show.imdb_id}
              seasons={show.seasons.filter((season) => season.season_number > 0)}
            />
          </WatchLayout>
        </StyledEngineProvider>
      ) : null}
    </AnimatedPage>
  );
};

export default ShowPlayer;

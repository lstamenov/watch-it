import { StyledEngineProvider } from '@mui/material';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useSearchParams } from 'react-router-dom';
import WatchLayout from '../../../layouts/WatchLayout/WatchLayout';
import { useWatchShow } from '../../../store';
import { Season, Episode } from '../../../types/types';
import AnimatedPage from '../../../ui/AnimatedPage/AnimatedPage';
import EpisodePicker from '../../../ui/EpisodePicker/EpisodePicker';
import NotFound from '../../NotFound/NotFound';
import styles from '../Watch.module.css';

const ShowPlayer: React.FC = () => {
  const showId = useParams().id;
  const {
    showData: { show, recommendations, similar, status },
    loadShow,
  } = useWatchShow();
  const { i18n } = useTranslation();

  const [isCorrectId, setIsCorrectId] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const seasons = show?.seasons.filter((season) => season.season_number > 0) || [];

  const urlSeason = searchParams.get('season') || 1;
  const urlEpisode = searchParams.get('episode') || 1;

  const [currentSeason, setCurrentSeason] = useState<Season | null>(
    seasons.length ? seasons[Number(urlSeason) - 1] : null,
  );
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(
    currentSeason ? currentSeason.episodes[Number(urlEpisode) - 1] : null,
  );
  const showURL = `https://autoembed.to/tv/imdb/${show?.imdb_id}-${currentSeason?.season_number}-${currentEpisode?.episode_number}`;

  useLayoutEffect(() => {
    const id = showId ? parseInt(showId) : -1;

    if (id !== -1) {
      setIsCorrectId(true);
      loadShow(id);
    } else {
      setIsCorrectId(false);
    }
  }, [showId, i18n.language]);

  useEffect(() => {
    if (show) {
      setCurrentSeason(seasons[Number(urlSeason) - 1]);
    }
  }, [show]);

  useEffect(() => {
    if (currentSeason) {
      setCurrentEpisode(currentSeason?.episodes[Number(urlEpisode) - 1] || null);
    }
  }, [currentSeason]);

  const handleEpisodeChange = (episode: Episode, season: Season) => {
    setSearchParams({
      episode: episode.episode_number.toString(),
      season: season.season_number.toString(),
    });
    setCurrentEpisode(episode);
    setCurrentSeason(season);
  };

  const nextEpisode: { episode: Episode; season: Season } | undefined = useMemo(() => {
    if (!show || !currentEpisode || !currentSeason) {
      return undefined;
    }

    if (
      currentEpisode.episode_number === currentSeason.episodes.length &&
      currentSeason.id === seasons[seasons.length - 1].id
    ) {
      return undefined;
    }

    if (currentEpisode.episode_number === currentSeason.episodes.length) {
      return {
        episode: seasons[currentSeason.season_number - 1].episodes[0],
        season: seasons[currentSeason.season_number],
      };
    }

    return {
      episode: currentSeason.episodes[currentEpisode.episode_number],
      season: currentSeason,
    };
  }, [currentEpisode, currentSeason]);

  const handleNextEpisodeClick = (selectorHandler: (seasonNumber: number) => void) => {
    if (!nextEpisode) return;

    const { episode, season } = nextEpisode;
    handleEpisodeChange(episode, season);
    selectorHandler(season.season_number);
  };

  const renderPlayer = useCallback(() => {
    if (currentEpisode && currentSeason) {
      return (
        <>
          <EpisodePicker
            onEpisodeChange={handleEpisodeChange}
            onNextEpisodeClick={handleNextEpisodeClick}
            currentSeason={currentSeason}
            nextEpisode={nextEpisode?.episode}
            currentEpisode={currentEpisode}
            seasons={seasons}
          />
          <iframe className={styles.player} src={showURL} frameBorder="0" allowFullScreen></iframe>
        </>
      );
    }
  }, [currentEpisode, currentSeason, nextEpisode?.episode]);

  if (!isCorrectId) return <NotFound />;

  return (
    <AnimatedPage isLoading={status === 'pending'}>
      {show && (
        <StyledEngineProvider injectFirst>
          <WatchLayout
            isLoading={status === 'pending'}
            similar={similar}
            recommended={recommendations}
            overview={show.overview}
            title={show.name}
            isShow
          >
            {renderPlayer()}
          </WatchLayout>
        </StyledEngineProvider>
      )}
    </AnimatedPage>
  );
};

export default ShowPlayer;

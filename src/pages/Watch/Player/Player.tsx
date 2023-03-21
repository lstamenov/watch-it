import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Dropdown from '../../../components/Dropdown/DropDown';
import useMobile from '../../../hooks/useMobile';
import { Season } from '../../../types/types';
import EpisodePicker from '../../../ui/EpisodePicker/EpisodePicker';
import styles from './Player.module.css';

interface Props {
  isShow: boolean;
  id: string;
  seasons?: Season[];
}

const Player: React.FC<Props> = ({ isShow, id, seasons = [] }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const ulrSeason = searchParams.get('season') || 1;
  const ulrEpisode = searchParams.get('episode') || 1;

  const [currentSeason, setCurrentSeason] = useState(
    seasons.length > 0 ? seasons[Number(ulrSeason) - 1 || 0] : null,
  );

  useEffect(() => {
    setCurrentSeason(seasons.length > 0 ? seasons[Number(ulrSeason) - 1 || 0] : null);
  }, [seasons]);

  const isMobile = useMobile();

  const movieURL = `https://autoembed.to/movie/imdb/${id}`;
  const showURL = ` https://autoembed.to/tv/imdb/${id}-${ulrSeason}-${ulrEpisode}`;

  const handleSeasonChange = (value: string) => {
    setSearchParams({ season: value, episode: '1' });
    setCurrentSeason(seasons.filter((season) => season.season_number === Number(value))[0]);
  };

  const handleEpisodeChange = (value: string) =>
    setSearchParams({ episode: value, season: String(ulrSeason) });

  const getSeasons = () => seasons.map((season) => season.season_number);

  const getEpisodes = useCallback(() => {
    return Array.from({ length: currentSeason ? currentSeason.episode_count : 1 }, (_, i) => i + 1);
  }, [currentSeason]);
  const renderMobile = () =>
    isShow && seasons ? (
      <>
        <div className={styles.episodeSelector}>
          <Dropdown prefix="season" items={getSeasons()} onChange={handleSeasonChange} />
          <Dropdown
            current={Number(ulrEpisode)}
            prefix="episode"
            items={getEpisodes()}
            onChange={handleEpisodeChange}
          />
        </div>
        <iframe className={styles.player} src={showURL} frameBorder="0" allowFullScreen></iframe>
      </>
    ) : (
      <iframe className={styles.player} src={movieURL} frameBorder="0" allowFullScreen></iframe>
    );

  return isMobile ? (
    renderMobile()
  ) : isShow && seasons ? (
    <>
      <EpisodePicker currentSeason={currentSeason || seasons[0]} seasons={seasons || []} />
      <div className={styles.episodeSelector}>
        <Dropdown
          current={currentSeason?.season_number || 1}
          prefix="season"
          items={getSeasons()}
          onChange={handleSeasonChange}
        />
        <Dropdown
          current={Number(ulrEpisode)}
          prefix="episode"
          items={getEpisodes()}
          onChange={handleEpisodeChange}
        />
      </div>
      <iframe className={styles.player} src={showURL} frameBorder="0" allowFullScreen></iframe>
    </>
  ) : (
    <iframe className={styles.player} src={movieURL} frameBorder="0" allowFullScreen></iframe>
  );
};

export default Player;

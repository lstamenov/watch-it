import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Dropdown from '../../../components/Dropdown/DropDown';
import useMobile from '../../../hooks/useMobile';
import { Season } from '../../../types/types';
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
    seasons.length > 0 ? seasons[Number(ulrSeason) - 1] : null,
  );

  const isMobile = useMobile();

  const movieURL = `https://imdbembed.xyz/movie/imdb/${id}?server=2`;
  const showURL = `https://imdbembed.xyz/tv/imdb/${id}-${ulrSeason}-${ulrEpisode}?server=2`;

  const handleSeasonChange = (value: string) => {
    setSearchParams({ season: value, episode: '1' });
    setCurrentSeason(
      seasons.filter((season) => season.season_number === Number(value))[0],
    );
  };

  const handleEpisodeChange = (value: string) => setSearchParams({ episode: value, season: String(ulrSeason) });

  const getSeasons = () =>
    seasons
      .map((season) => season.season_number)
      .filter((season) => season !== 0);

  const getEpisodes = () => Array.from(
    { length: currentSeason ? currentSeason.episode_count : 1 },
    (_, i) => i + 1,
  );

  const renderMobile = () =>
    isShow && seasons ? (
      <>
        <div className={styles.episodeSelector}>
          <Dropdown
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
        <iframe
          className={styles.player}
          src={showURL}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </>
    ) : (
      <iframe
        className={styles.player}
        src={movieURL}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    );

  return isMobile ? (
    renderMobile()
  ) : isShow && seasons ? (
    <>
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
      <iframe
        className={styles.player}
        src={showURL}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </>
  ) : (
    <iframe
      className={styles.player}
      src={movieURL}
      frameBorder="0"
      allowFullScreen
    ></iframe>
  );
};

export default Player;

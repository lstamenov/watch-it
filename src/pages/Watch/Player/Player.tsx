import React, { useState } from 'react';
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
  const [currentSeason, setCurrentSeason] = useState(seasons[0]);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const isMobile = useMobile();

  const movieURL = `https://imdbembed.xyz/movie/imdb/${id}?server=2`;
  const showURL = `https://imdbembed.xyz/tv/imdb/${id}-${currentSeason?.season_number}-${currentEpisode}?server=2`;

  const handleSeasonChange = (value: string) => {
    setCurrentSeason(
      seasons.filter((season) => season.season_number === Number(value))[0],
    );
    setCurrentEpisode(1);
  };

  const handleEpisodeChange = (value: string) => {
    setCurrentEpisode(Number(value));
  };

  const getSeasons = () =>
    seasons
      .map((season) => season.season_number)
      .filter((season) => season !== 0);

  const getEpisodes = () =>
    Array.from({ length: currentSeason.episode_count }, (_, i) => i + 1);

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
            current={currentEpisode}
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
          prefix="season"
          items={getSeasons()}
          onChange={handleSeasonChange}
        />
        <Dropdown
          current={currentEpisode}
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

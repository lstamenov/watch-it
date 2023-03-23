import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Episode, Season } from '../../types/types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  DialogContent,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import Button from '@mui/material/Button';
import styles from './EpisodePicker.module.css';
import { useTranslation } from 'react-i18next';

interface Props {
  seasons: Season[];
  currentSeason: Season;
  currentEpisode: Episode;
  nextEpisode?: Episode;
  onEpisodeChange: (episode: Episode, season: Season) => void;
  onNextEpisodeClick: (selectorHandler: (seasonNumber: number) => void) => void;
}

const EpisodePicker: React.FC<Props> = ({
  seasons,
  currentSeason,
  currentEpisode,
  nextEpisode,
  onEpisodeChange,
  onNextEpisodeClick,
}) => {
  const { t } = useTranslation();
  const [isSelectorOpened, setIsSelectorOpened] = useState(false);
  const [expandedSeason, setExpandedSeason] = useState<number>(currentSeason.season_number);
  const expandedSeasonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSelectorOpened) {
      setTimeout(() => {
        expandedSeasonRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 1000);
    }
  }, [isSelectorOpened, expandedSeasonRef, expandedSeasonRef.current]);

  const getEpisodeName = (episode: Episode) => {
    if (episode.name.includes(String(episode.episode_number))) return episode.name;

    return `${t('EPISODE')} ${episode.episode_number}: ${episode.name}`;
  };

  const onChange = (seasonNumber: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedSeason(isExpanded ? seasonNumber : -1);
  };

  const onSelectorClose = () => {
    setIsSelectorOpened(false);
    setExpandedSeason(currentSeason.season_number);
  };

  const onEpisodeClick = (params: Parameters<typeof onEpisodeChange>) => () => {
    const [episode, season] = params;
    onEpisodeChange(episode, season);
    setTimeout(() => {
      setIsSelectorOpened(false);
    }, 500);
  };

  const SeasonsContent = useMemo(
    () => (
      <>
        {seasons.map((season) => (
          <div
            ref={season.season_number === currentSeason.season_number ? expandedSeasonRef : null}
          >
            <Accordion
              expanded={season.season_number === expandedSeason}
              className={styles.accordion}
              key={season.season_number}
              onChange={onChange(season.season_number)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon htmlColor="white" />}>
                <Typography variant="subtitle1">{season.name.toUpperCase()}</Typography>
              </AccordionSummary>
              <AccordionDetails className={styles.episodesContainer}>
                {season.episodes.map((episode) => {
                  const isSelected = currentEpisode.id === episode.id;
                  return (
                    <Button
                      variant="contained"
                      endIcon={<PlayArrowIcon />}
                      className={isSelected ? styles.selectedEpisode : styles.episode}
                      key={episode.id}
                      onClick={onEpisodeClick([episode, season])}
                    >
                      {getEpisodeName(episode)}
                    </Button>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </>
    ),
    [seasons, currentEpisode, currentSeason, expandedSeason, expandedSeasonRef.current],
  );

  return (
    <div className={styles.container}>
      <Button
        className={styles.button}
        endIcon={<ExpandMoreIcon />}
        variant="outlined"
        onClick={() => setIsSelectorOpened(true)}
      >
        {`${t('SEASON')} ${currentSeason.season_number}: ${t('EPISODE')} ${
          currentEpisode.episode_number
        }`}
      </Button>
      <Button
        disabled={!!!nextEpisode}
        className={styles.button}
        endIcon={<SkipNextIcon />}
        variant="outlined"
        onClick={() => onNextEpisodeClick(setExpandedSeason)}
      >
        {t('NEXT_EPISODE')}
      </Button>
      <Drawer
        PaperProps={{
          style: {
            backgroundColor: '#2d2e2e',
          },
        }}
        className={styles.dialog}
        open={isSelectorOpened}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: '#4f4f4f' }}>
          <Toolbar>
            <IconButton onClick={onSelectorClose} edge="start" color="inherit">
              <ArrowBackIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {t('SELECT_AN_EPISODE')}
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>{SeasonsContent}</DialogContent>
      </Drawer>
    </div>
  );
};

export default EpisodePicker;

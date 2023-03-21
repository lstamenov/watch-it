import React, { useState } from 'react';
import { Episode, Season } from '../../types/types';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
  Toolbar,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DoneSharp from '@mui/icons-material/DoneSharp';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import styles from './EpisodePicker.module.css';
import { TransitionProps } from '@mui/material/transitions';

interface Props {
  seasons: Season[];
  currentSeason: Season;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const EpisodePicker: React.FC<Props> = ({ seasons, currentSeason }) => {
  const [isSelectorOpened, setIsSelectorOpened] = useState(false);
  const [expandedSeason, setExpandedSeason] = useState<number>(currentSeason.season_number);
  const selectedEpisodeId = seasons[0].episodes[0].id;

  const getEpisodeName = (episode: Episode) => {
    if (episode.name.includes(String(episode.episode_number))) return episode.name;

    return `Episode ${episode.episode_number}: ${episode.name}`;
  };

  const onChange = (seasonNumber: number) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedSeason(isExpanded ? seasonNumber : -1);
  };

  return (
    <div>
      <Button onClick={() => setIsSelectorOpened(true)}>Episodes</Button>
      <Dialog
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            backgroundColor: '#2d2e2e',
          },
        }}
        fullScreen
        className={styles.dialog}
        open={isSelectorOpened}
      >
        <AppBar sx={{ position: 'relative', backgroundColor: '#4f4f4f' }}>
          <Toolbar>
            <IconButton onClick={() => setIsSelectorOpened(false)} edge="start" color="inherit">
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h4" component="div">
              SELECT AN EPISODE
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          {seasons.map((season) => (
            <Accordion
              expanded={expandedSeason === season.season_number}
              className={styles.accordion}
              key={season.season_number}
              onChange={onChange(season.season_number)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon htmlColor="white" />}>
                <Typography className={styles.season}>{season.name.toUpperCase()}</Typography>
              </AccordionSummary>
              <AccordionDetails className={styles.episodesContainer}>
                {season.episodes.map((episode) => {
                  const isSelected = selectedEpisodeId === episode.id;
                  return (
                    <Button
                      variant="outlined"
                      endIcon={isSelected && <DoneSharp />}
                      className={isSelected ? styles.selectedEpisode : styles.episode}
                      key={episode.id}
                    >
                      {getEpisodeName(episode)}
                    </Button>
                  );
                })}
              </AccordionDetails>
            </Accordion>
          ))}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EpisodePicker;

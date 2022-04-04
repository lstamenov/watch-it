import React, { useEffect, useRef, useState } from 'react';
import {
  Button,
  ButtonGroup,
  Container,
  StyledEngineProvider,
} from '@mui/material';
import styles from './Genres.module.css';
import GenresLayout from '../../layouts/GenresLayout/GenresLayout';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { selectMovieGenres, selectTvGenres } from '../../store/genres/selectors';
import { loadGenres } from '../../store/genres/thunk';
import GenreItem from '../../components/genreItem/GenreItem';
import { Genre } from '../../types/types';
import {
  selectMovieGenreResults,
  selectShowGenreResults,
} from '../../store/results/selectors';
import {
  loadMoreMovieGenreResults,
  loadMoreShowGenreResults,
  loadMovieGenreResults,
  loadShowGenreResults,
} from '../../store/results/thunk';
import InfiniteScrollLayout from '../../layouts/InfiniteScrollLayout/InfiniteScrollLayout';
import InfoText from '../../components/InfoText/InfoText';
import { useLocation } from 'react-router-dom';

const Genres: React.FC = () => {
  const passedState: any = useLocation().state;
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [hasResults, setHasResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('movies');

  const moviesButtonRef = useRef<HTMLButtonElement>(null);
  const showsButtonRef = useRef<HTMLButtonElement>(null);

  
  const dispatch = useDispatch();

  const movieGenres = useAppSelector(selectMovieGenres);
  const tvGenres = useAppSelector(selectTvGenres);
  const movies = useAppSelector(selectMovieGenreResults);
  const shows = useAppSelector(selectShowGenreResults);

  const onGenreClick = (genre: Genre, isClicked: boolean) => {
    if (isClicked) {
      setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  useEffect(() => {
    if (selectedGenres.length > 0) {
      dispatch(loadMovieGenreResults(selectedGenres));
      dispatch(loadShowGenreResults(selectedGenres));
      setHasResults(true);
    } else {
      setHasResults(false);
    }
  }, [selectedGenres]);

  useEffect(() => {
    dispatch(loadGenres());
  }, []);

  const renderResults = () => {
    if (selectMovieGenres.length === 0) return <InfoText text='Select genre to start exploring...' />;

    if (selectedCategory === 'movies') {
      return (
        <InfiniteScrollLayout
          movies={movies.results}
          loadMovies={() => loadMoreMovieGenreResults(selectedGenres, movies.page + 1)}
          page={movies.page}
        />
      );
    } else {
      return (
        <InfiniteScrollLayout
          movies={shows.results}
          loadMovies={() => loadMoreShowGenreResults(selectedGenres, shows.page + 1)}
          page={shows.page}
        />
      );
    }
  };

  const renderGenres = () => {
    if (selectedCategory === 'movies') {
      return (
        movieGenres.map((genre) => (
          passedState.selectedGenre && passedState.selectedGenre.id === genre.id ? <GenreItem isActive key={genre.id} genre={genre} onClick={onGenreClick} /> : <GenreItem key={genre.id} genre={genre} onClick={onGenreClick} />
        ))
      );
    } else {
      return (
        tvGenres.map((genre) => (
          passedState.selectedGenre && passedState.selectedGenre.id === genre.id ? <GenreItem isActive key={genre.id} genre={genre} onClick={onGenreClick} /> : <GenreItem key={genre.id} genre={genre} onClick={onGenreClick} />
        ))
      );
    }
  };

  const onMoviesButtonClick = () => {
    setSelectedCategory('movies');
    setSelectedGenres([]);
    moviesButtonRef.current?.classList.add(styles.selectedBtn);
    showsButtonRef.current?.classList.remove(styles.selectedBtn);
  };

  const onShowsButtonClick = () => {
    setSelectedCategory('shows');
    setSelectedGenres([]);
    showsButtonRef.current?.classList.add(styles.selectedBtn);
    moviesButtonRef.current?.classList.remove(styles.selectedBtn);
  };

  useEffect(() => {
    if (movieGenres && tvGenres && passedState.selectedGenre) {
      const foundTvGenre = tvGenres.find(genre => genre.id === passedState.selectedGenre.id);
      const foundMovieGenre = movieGenres.find(genre => genre.id === passedState.selectedGenre.id);
      
      if (foundTvGenre) {
        onShowsButtonClick();
        setSelectedGenres([passedState.selectedGenre]);
      }

      if (foundMovieGenre) {
        onMoviesButtonClick();
        setSelectedGenres([passedState.selectedGenre]);
      }
    }
  }, [movieGenres, tvGenres]);
  
  return (
    <StyledEngineProvider injectFirst>
      <Container className={styles.container}>
        <GenresLayout>
          {renderGenres()}
        </GenresLayout>
        <ButtonGroup variant="contained" className={styles.btnGroup}>
          <Button
            ref={moviesButtonRef}
            onClick={onMoviesButtonClick}
            className={`${styles.btn} ${styles.selectedBtn}`}
          >
            Movies
          </Button>
          <Button
            ref={showsButtonRef}
            onClick={onShowsButtonClick}
            className={styles.btn}
          >
            Shows
          </Button>
        </ButtonGroup>
        {hasResults ? (
          renderResults()
        ) : (
          <InfoText text='Select genre and category to start exploring...' />
        )}
      </Container>
    </StyledEngineProvider>
  );
};

export default Genres;

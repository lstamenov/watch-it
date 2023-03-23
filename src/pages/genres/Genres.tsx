import React, { useEffect, useMemo, useState } from 'react';
import { Container, StyledEngineProvider } from '@mui/material';
import styles from './Genres.module.css';
import GenresLayout from '../../layouts/GenresLayout/GenresLayout';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/hooks';
import { selectMovieGenres, selectTvGenres } from '../../store/genres/selectors';
import { loadGenres } from '../../store/genres/thunk';
import GenreItem from '../../components/genreItem/GenreItem';
import { Genre } from '../../types/types';
import { selectMovieGenreResults, selectShowGenreResults } from '../../store/results/selectors';
import { selectLoader } from '../../store/loader/selectors';
import {
  loadMoreMovieGenreResults,
  loadMoreShowGenreResults,
  loadMovieGenreResults,
  loadShowGenreResults,
} from '../../store/results/thunk';
import InfiniteScrollLayout from '../../layouts/InfiniteScrollLayout/InfiniteScrollLayout';
import InfoText from '../../components/InfoText/InfoText';
import { useLocation } from 'react-router-dom';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import GenresTab from '../../ui/GenresTab/GenresTab';
import Loader from '../../components/loader/Loader';

const Genres: React.FC = () => {
  const [passedState, setPassedState] = useState<any>(useLocation().state);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [hasResults, setHasResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'movies' | 'shows'>('movies');
  const { i18n, t } = useTranslation();
  const dispatch = useDispatch();

  const movieGenres = useAppSelector(selectMovieGenres);
  const tvGenres = useAppSelector(selectTvGenres);
  const movies = useAppSelector(selectMovieGenreResults);
  const shows = useAppSelector(selectShowGenreResults);
  const isLoading = useAppSelector(selectLoader);

  const onGenreClick = (genre: Genre, isClicked: boolean) => {
    if (isClicked) {
      setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  useEffect(() => {
    if (selectedGenres.length > 0) {
      if (selectedCategory === 'movies') {
        dispatch(loadMovieGenreResults(selectedGenres));
      } else {
        dispatch(loadShowGenreResults(selectedGenres));
      }
      setHasResults(true);
    } else {
      setHasResults(false);
    }
  }, [selectedGenres]);

  useEffect(() => {
    dispatch(loadGenres());
  }, [i18n.language]);

  const renderResults = () => {
    if (selectMovieGenres.length === 0) return <InfoText text={t('GENRES_PAGE_INFO')} />;

    if (selectedCategory === 'movies') {
      return (
        <InfiniteScrollLayout
          movies={movies.results}
          loadMovies={() => loadMoreMovieGenreResults(selectedGenres, (movies.page || 1) + 1)}
          page={movies.page}
        />
      );
    } else {
      return (
        <InfiniteScrollLayout
          movies={shows.results}
          loadMovies={() => loadMoreShowGenreResults(selectedGenres, (shows.page || 1) + 1)}
          page={shows.page}
        />
      );
    }
  };

  const GenresComponent = useMemo(() => {
    if (selectedCategory === 'movies') {
      return passedState
        ? movieGenres.map((genre) =>
            passedState.selectedGenre && passedState.selectedGenre.id === genre.id ? (
              <GenreItem isActive key={`movie-${genre.id}`} genre={genre} onClick={onGenreClick} />
            ) : (
              <GenreItem key={`movie-${genre.id}`} genre={genre} onClick={onGenreClick} />
            ),
          )
        : movieGenres.map((genre) => (
            <GenreItem key={`movie-${genre.id}`} genre={genre} onClick={onGenreClick} />
          ));
    }
    return passedState
      ? tvGenres.map((genre) =>
          passedState.selectedGenre && passedState.selectedGenre.id === genre.id ? (
            <GenreItem isActive key={`show-${genre.id}`} genre={genre} onClick={onGenreClick} />
          ) : (
            <GenreItem key={`show-${genre.id}`} genre={genre} onClick={onGenreClick} />
          ),
        )
      : tvGenres.map((genre) => (
          <GenreItem key={`show-${genre.id}`} genre={genre} onClick={onGenreClick} />
        ));
  }, [movieGenres, tvGenres, selectedCategory, selectedGenres, passedState]);

  const onMoviesButtonClick = () => {
    setSelectedCategory('movies');
    setSelectedGenres([]);
  };

  const onShowsButtonClick = () => {
    setSelectedCategory('shows');
    setSelectedGenres([]);
  };

  useEffect(() => {
    if (movieGenres && tvGenres && passedState) {
      const foundTvGenre = tvGenres.find((genre) => genre.id === passedState.selectedGenre.id);
      const foundMovieGenre = movieGenres.find(
        (genre) => genre.id === passedState.selectedGenre.id,
      );

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
    <AnimatedPage>
      <StyledEngineProvider injectFirst>
        <Helmet>
          <title>watch-it - Search movies and shows by genre</title>
          <meta name="description" content="Browse through genres to find the best match for you" />
        </Helmet>
        <Container className={styles.container}>
          <GenresLayout>{GenresComponent}</GenresLayout>
          <GenresTab
            setCurrentTab={(tab) => {
              setSelectedCategory(tab);
              setSelectedGenres([]);
              setPassedState(null);
            }}
            currentTab={selectedCategory}
          />
          {isLoading && !hasResults ? (
            <Loader />
          ) : hasResults ? (
            renderResults()
          ) : (
            <InfoText text={t('GENRES_PAGE_INFO')} />
          )}
        </Container>
      </StyledEngineProvider>
    </AnimatedPage>
  );
};

export default Genres;

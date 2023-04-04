import React, { useEffect, useMemo, useState } from 'react';
import { Container, StyledEngineProvider } from '@mui/material';
import GenresLayout from '../../layouts/GenresLayout/GenresLayout';
import GenreItem from '../../components/genreItem/GenreItem';
import { Genre } from '../../types/types';
import InfiniteScrollLayout from '../../layouts/InfiniteScrollLayout/InfiniteScrollLayout';
import InfoText from '../../components/InfoText/InfoText';
import { useLocation } from 'react-router-dom';
import AnimatedPage from '../../ui/AnimatedPage/AnimatedPage';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import GenresTab from '../../ui/GenresTab/GenresTab';
import styles from './Genres.module.css';
import { useGenres, useMovieGenreResults, useShowGenreResults } from '../../store';

const Genres: React.FC = () => {
  const {
    loadShowGenres,
    loadMovieGenres,
    genres: { showGenres, movieGenres, status },
  } = useGenres();

  const { movieGenreResults, loadMovieGenreResults, clearMovies } = useMovieGenreResults();
  const { showGenreResults, loadShowGenreResults, clearShows } = useShowGenreResults();

  const [movieGenreResultsPage, setMovieGenreResultsPage] = useState(1);
  const [showGenreResultsPage, setShowGenreResultsPage] = useState(1);
  const [passedState, setPassedState] = useState<any>(useLocation().state);
  const [selectedGenres, setSelectedGenres] = useState<Genre[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'movies' | 'shows'>('movies');
  const { i18n, t } = useTranslation();

  const onGenreClick = (genre: Genre, isClicked: boolean) => {
    if (isClicked) {
      setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const clearGenresState = () => {
    setPassedState(null);
    clearMovies();
    clearShows();
    setMovieGenreResultsPage(1);
    setShowGenreResultsPage(1);
  };

  useEffect(() => {
    loadShowGenres();
    loadMovieGenres();
  }, [i18n.language]);

  const onLoadMovieGenreResults = () => {
    loadMovieGenreResults({ genres: selectedGenres, page: movieGenreResultsPage });
    setMovieGenreResultsPage(movieGenreResultsPage + 1);
  };

  const onLoadShowGenreResults = () => {
    loadShowGenreResults({ genres: selectedGenres, page: movieGenreResultsPage });
    setShowGenreResultsPage(showGenreResultsPage + 1);
  };

  useEffect(() => {
    clearGenresState();
    if (selectedGenres.length > 0) {
      if (selectedCategory === 'movies') {
        onLoadMovieGenreResults();
      } else {
        onLoadShowGenreResults();
      }
    }
  }, [selectedGenres]);

  const renderResults = () => {
    if (selectedGenres.length === 0) return <InfoText text={t('GENRES_PAGE_INFO')} />;

    if (selectedCategory === 'movies') {
      return (
        <InfiniteScrollLayout
          isLoading={movieGenreResults.status === 'pending'}
          movies={movieGenreResults.results}
          loadMovies={onLoadMovieGenreResults}
          page={movieGenreResultsPage}
        />
      );
    } else {
      return (
        <InfiniteScrollLayout
          isLoading={showGenreResults.status === 'pending'}
          movies={showGenreResults.results}
          loadMovies={onLoadShowGenreResults}
          page={showGenreResultsPage}
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
      ? showGenres.map((genre) =>
          passedState.selectedGenre && passedState.selectedGenre.id === genre.id ? (
            <GenreItem isActive key={`show-${genre.id}`} genre={genre} onClick={onGenreClick} />
          ) : (
            <GenreItem key={`show-${genre.id}`} genre={genre} onClick={onGenreClick} />
          ),
        )
      : showGenres.map((genre) => (
          <GenreItem key={`show-${genre.id}`} genre={genre} onClick={onGenreClick} />
        ));
  }, [movieGenres, showGenres, selectedCategory, selectedGenres, passedState]);

  const onMoviesButtonClick = () => {
    setSelectedCategory('movies');
    setSelectedGenres([]);
  };

  const onShowsButtonClick = () => {
    setSelectedCategory('shows');
    setSelectedGenres([]);
  };

  useEffect(() => {
    if (movieGenres && showGenres && passedState) {
      const foundTvGenre = showGenres.find((genre) => genre.id === passedState.selectedGenre.id);
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
  }, [movieGenres, showGenres]);

  return (
    <AnimatedPage isLoading={status === 'pending'}>
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
              clearGenresState();
            }}
            currentTab={selectedCategory}
          />
          {selectedGenres.length && renderResults()}
        </Container>
      </StyledEngineProvider>
    </AnimatedPage>
  );
};

export default Genres;

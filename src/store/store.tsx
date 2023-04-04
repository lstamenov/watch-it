import { configureStore } from '@reduxjs/toolkit';
import { useSelector, useDispatch } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import ThunkMiddleware from 'redux-thunk';
import moviesReducer from './features/moviesSlice/moviesSlice';
import showsReducer from './features/showsSlice/showsSlice';
import userReducer from './features/userSlice/userSlice';
import genresReducer from './features/genresSlice/genresSlice';
import resultsReducer from './features/resultsSlice/resultsSlice';
import watchReducer from './features/watchSlice/watchSlice';
import trendingSlice from './features/trendingSlice/trendingSlice';

const store = configureStore({
  reducer: {
    movies: moviesReducer,
    shows: showsReducer,
    user: userReducer,
    genres: genresReducer,
    results: resultsReducer,
    watch: watchReducer,
    trending: trendingSlice,
  },
  middleware: (gDM) => gDM().concat(ThunkMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;

export default store;

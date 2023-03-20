import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import movieReducer from './movies/reducer';
import showReducer from './shows/reducer';
import loaderReducer from './loader/reducer';
import genresReducer from './genres/reducer';
import trendingReducer from './trending/reducer';
import resultsReducer from './results/reducer';
import watchReducer from './watch/reducer';
import userReducer from './user/reducer';
import toastsReducer from './toasts/reducer';

const rootReducer = combineReducers({
  movies: movieReducer,
  shows: showReducer,
  loader: loaderReducer,
  genres: genresReducer,
  trending: trendingReducer,
  results: resultsReducer,
  watch: watchReducer,
  user: userReducer,
  toastMessages: toastsReducer,
});

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
export const store = createStore(rootReducer, composedEnhancer);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

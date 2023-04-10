import ChangePassword from '../pages/ChangePassword/ChangePassword';
import Genres from '../pages/genres/Genres';
import GoogleVerification from '../pages/GoogleVerification/GoogleVerification';
import Home from '../pages/home/Home';
import Login from '../pages/Login/Login';
import Movies from '../pages/movies/Movies';
import NotFound from '../pages/NotFound/NotFound';
import Profile from '../pages/Profile/Profile';
import Register from '../pages/Register/Register';
import SearchResults from '../pages/SearchResults/SearchResults';
import Shows from '../pages/shows/Shows';
import MoviePlayer from '../pages/Watch/Movie/MoviePlayer';
import ShowPlayer from '../pages/Watch/Show/ShowPlayer';
import { RouteData } from '../types/types';

export const routes: RouteData[] = [
  {
    type: 'PUBLIC_ROUTE',
    path: '/results',
    Page: SearchResults,
  },
  {
    type: 'PRIVATE_ROUTE',
    path: '/profile',
    Page: Profile,
  },
  {
    type: 'AUTH_ROUTE',
    path: '/register',
    Page: Register,
  },
  {
    type: 'AUTH_ROUTE',
    path: '/login',
    Page: Login,
  },
  {
    type: 'PUBLIC_ROUTE',
    path: '/shows/play/:id',
    Page: ShowPlayer,
  },
  {
    type: 'PUBLIC_ROUTE',
    path: '/movies/play/:id',
    Page: MoviePlayer,
  },
  {
    type: 'PRIVATE_ROUTE',
    path: 'change-password',
    Page: ChangePassword,
  },
  {
    type: 'PUBLIC_ROUTE',
    path: '/movies',
    Page: Movies,
  },
  {
    type: 'PUBLIC_ROUTE',
    path: '/shows',
    Page: Shows,
  },
  {
    type: 'PUBLIC_ROUTE',
    path: '/genres',
    Page: Genres,
  },
  {
    type: 'PUBLIC_ROUTE',
    path: '/google7c0872963fa47a44.html',
    Page: GoogleVerification,
  },
  {
    type: 'PUBLIC_ROUTE',
    path: '/',
    Page: Home,
  },
  {
    type: 'PUBLIC_ROUTE',
    path: '*',
    Page: NotFound,
  },
];

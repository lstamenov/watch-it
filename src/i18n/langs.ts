import { ReactComponent as GB } from './gb.svg';
import { ReactComponent as BG } from './bg.svg';

export const resources = {
  en: {
    translation: {
      HOME: 'Home',
      MOVIES: 'Movies',
      SHOWS: 'Shows',
      GENRES: 'Genres',
      PROFILE: 'Profile',
      SIGN_IN: 'Sign In',
      SIGN_UP: 'Sign Up',
      USERNAME: 'Username',
      PASSWORD: 'Password',
      CONFIRM_PASSWORD: 'Confirm Password',
      NO_ACCOUNT: "Don't have an account?",
      HAS_ACCOUNT: 'Already have an account?',
      EMAIL: 'Email',
      DAILY_TRENDING_MOVIES: 'Daily trending movies',
      WEEKLY_TRENDING_MOVIES: 'Weekly trending movies',
      POPULAR_MOVIES: 'Popular movies',
      TRENDING_SHOWS: 'Trending shows',
      TOP_RATED_SHOWS: 'Top rated shows',
      POPULAR_SHOWS: 'Popular shows',
      GENRES_PAGE_INFO: 'Select a genre',
      YOUR_MOVIES_LIST: 'Your movie list',
      YOUR_SHOWS_LIST: 'Your show list',
      LOG_OUT: 'Logout',
      CHANGE_AVATAR: 'Change avatar',
    },
  },
  bg: {
    translation: {
      HOME: 'Начало',
      MOVIES: 'Филми',
      SHOWS: 'Сериали',
      GENRES: 'Жанрове',
      PROFILE: 'Профил',
      SIGN_IN: 'Вход',
      SIGN_UP: 'Регистрация',
      USERNAME: 'Потребителско име',
      PASSWORD: 'Парола',
      CONFIRM_PASSWORD: 'Потвърди Парола',
      NO_ACCOUNT: 'Нямаш регистрация?',
      HAS_ACCOUNT: 'Вече имаш акаунт?',
      EMAIL: 'Имейл',
      DAILY_TRENDING_MOVIES: 'Трендинг филми днес',
      WEEKLY_TRENDING_MOVIES: 'Трендинг филми тази седмица',
      POPULAR_MOVIES: 'Популярни филми',
      TRENDING_SHOWS: 'Трендинг сериали',
      TOP_RATED_SHOWS: 'Високо оценени сериали',
      POPULAR_SHOWS: 'Популярни сериали',
      GENRES_PAGE_INFO: 'Избери жанр',
      YOUR_MOVIES_LIST: 'Твоите филми',
      YOUR_SHOWS_LIST: 'Твоите сериали',
      LOG_OUT: 'Изход',
      CHANGE_AVATAR: 'Смени аватар',
    },
  },
};

export type Lang = {
  id: keyof typeof resources;
  Icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

export const langs: Lang[] = [
  { id: 'bg', Icon: BG },
  { id: 'en', Icon: GB },
];

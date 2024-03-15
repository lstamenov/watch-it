import { Movie, TvShow } from '../types/types';

export const getMoviePosterPath = (path: string): string => {
  return `https://image.tmdb.org/t/p/original${path}`;
};

export const convertMinutesToHours = (runtime: number): string => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime - hours * 60;
  return `${hours}h ${minutes}m`;
};

export const formatMoney = (number: string): string => {
  const moneyArr = number.split('');
  const reversedArr = moneyArr.reverse();

  return reversedArr
    .map((val, index) => ((index + 2) % 3 === 0 && index !== 1 ? `${val}.` : `${val}`))
    .reverse()
    .toString()
    .replaceAll(',', '');
};

export function isShow(content: Movie | TvShow): content is TvShow {
  return Boolean((content as TvShow).name);
}


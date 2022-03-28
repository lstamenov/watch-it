export const getMoviePosterPath = (path: string): string => {
  return `https://image.tmdb.org/t/p/original${path}`;
};

export const convertMinutesToHours = (runtime: number): string => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime - (hours * 60);
  return `${hours}h ${minutes}m`;
};
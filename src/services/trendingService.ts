import axios from 'axios';
import { MORE_TRENDING_WEEKLY, TRENDING_DAILY, TRENDING_DAILY_TV, TRENDING_WEEKLY, TRENDING_WEEKLY_TV } from './constants';

export const fetchDailyTrendingTv = () => axios.get(TRENDING_DAILY_TV);
export const fetchWeeklyTrendingTv = () => axios.get(TRENDING_WEEKLY_TV);
export const fetchDailyTrending = () => axios.get(TRENDING_DAILY);
export const fetchWeeklyTrending = () => axios.get(TRENDING_WEEKLY);
export const fetchMoreWeeklyTrending = (page: number) => axios.get(`${MORE_TRENDING_WEEKLY}${page}`);
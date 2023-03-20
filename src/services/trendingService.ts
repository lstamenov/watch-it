import axios from 'axios';
import {
  MORE_TRENDING_WEEKLY,
  TRENDING_DAILY,
  TRENDING_DAILY_TV,
  TRENDING_WEEKLY,
  TRENDING_WEEKLY_TV,
} from './constants';
import i18n from '../i18n/i18n';

export const fetchDailyTrendingTv = () => axios.get(TRENDING_DAILY_TV(i18n.language));
export const fetchWeeklyTrendingTv = () => axios.get(TRENDING_WEEKLY_TV(i18n.language));
export const fetchDailyTrending = () => axios.get(TRENDING_DAILY(i18n.language));
export const fetchWeeklyTrending = () => axios.get(TRENDING_WEEKLY(i18n.language));
export const fetchMoreWeeklyTrending = (page: number) =>
  axios.get(`${MORE_TRENDING_WEEKLY(i18n.language)}${page}`);

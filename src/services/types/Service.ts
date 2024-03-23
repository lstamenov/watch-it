import { AxiosStatic } from 'axios';
import { i18n } from 'i18next';
import { NEW_API_URL } from '../constants';

export default abstract class Service {
  fetcher: AxiosStatic;

  translator: i18n;

  private baseApiUrl: string;

  constructor(fetcher: AxiosStatic, translator: i18n) {
    this.fetcher = fetcher;
    this.translator = translator;
    this.baseApiUrl = NEW_API_URL;
  }

  buildUrl(path: string): string {
    return `${this.baseApiUrl}/${path}`;
  }
}

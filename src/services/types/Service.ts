import { AxiosStatic } from 'axios';
import { i18n } from 'i18next';

export default abstract class Service {
  fetcher: AxiosStatic;

  translator: i18n;

  constructor(fetcher: AxiosStatic, translator: i18n) {
    this.fetcher = fetcher;
    this.translator = translator;
  }
}

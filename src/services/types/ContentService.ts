import Service from './Service';

export default abstract class ContentService<T> extends Service {
  abstract fetchTopRated(): Promise<T[]>;
  abstract fetchPopular(): Promise<T[]>;
  abstract fetchTrending(): Promise<T[]>;
  abstract fetchById(id: number): Promise<T>;
  abstract fetchFullDetailed(content: T[]): Promise<T[]>;
  abstract fetchRecommendations(id: number): Promise<T[]>;
  abstract fetchSimilar(id: number): Promise<T[]>;
}

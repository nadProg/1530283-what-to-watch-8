import { RouteProps } from 'react-router';
import { AuthorizationStatus } from '../const';

export type Film = {
  id: number,
  name: string,
  posterImage: string,
  previewImage: string,
  backgroundImage: string,
  backgroundColor: string,
  videoLink: string,
  previewVideoLink: string,
  description: string,
  rating: number,
  scoresCount: number,
  director: string,
  starring: string[],
  runTime: number,
  genre: string,
  released: number,
  isFavorite: boolean,
}

export type AppProps = {
  films: Film[],
}

export type MainScreenProps = {
  promoFilm: Film,
}

export type PromoFilmCardProps = {
  film: Film,
}

export type LogoProps = {
  theme?: 'light',
}

export type PrivateRouteProps = RouteProps & {
  authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus],
}

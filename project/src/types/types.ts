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
  actors: string[],
  runTime: number,
  genre: string,
  released: number,
  isFavorite: boolean,
}

export type FilmsScreenProps = {
  getFilmById: (id: number) => Film,
  getSimilarFilms: () => Film[],
}

export type MyListScreenProps = {
  getFavoriteFilms: () => Film[],
}

export type ReviewScreenProps = {
  getFilmById: (id: number) => Film,
}

export type PlayerScreenProps = {
  getFilmById: (id: number) => Film,
}

export type Params = {
  id: string
}

export type CustomRouteProps = RouteProps & {
  authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus],
}

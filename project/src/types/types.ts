import { RouteProps } from 'react-router';
import { AuthorizationStatus, RatingDescription } from '../const';

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

export type CommentPost = {
  rating: number,
  comment: string,
}

export type CommentGet = CommentPost & {
  id: number,
  user: {
    id: number,
    name: string,
  },
  date: Date,
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

export type AuthorizationStatusType = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];

export type RatingDescriptionType = typeof RatingDescription[keyof typeof RatingDescription];

export type CustomRouteProps = RouteProps & {
  authorizationStatus: AuthorizationStatusType,
}

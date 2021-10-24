import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AuthorizationStatus, FetchStatus } from '../constants';
import {
  setAuthorizationStatus,
  setFilms,
  setFilmsFetchStatus,
  setFilter,
  setPromoFilm,
  setPromoFetchStatus,
  setAuthorizationInfo
} from '../store/actions';

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

export type ServerFilm = {
  id: number,
  name: string,
  'poster_image': string,
  'preview_image': string,
  'background_image': string,
  'background_color': string,
  'video_link': string,
  'preview_video_link': string,
  description: string,
  rating: number,
  'scores_count': number,
  director: string,
  starring: string[],
  'run_time': number,
  genre: string,
  released: number,
  'is_favorite': boolean
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

export type User = {
  email: string,
  password: string,
}

export type Token = string;

export type FetchStatusType = ValuesOf<typeof FetchStatus>

export type FetchedData<T = any> = {
  data: T | null,
  status: FetchStatusType,
}

export type AuthoarizationInfo = {
  id: 1,
  email: string,
  name: string,
  avatarUrl: string,
  token: Token,
}

export type ServerAuthInfo = {
  id: 1,
  email: string,
  name: string,
  'avatar_url': string,
  token: Token,
}

export type State = {
  films: FetchedData<Film[]>,
  promoFilm: FetchedData<Film>,
  currentFilm: FetchedData<Film>,
  currentComments: FetchedData<CommentGet[]>,
  similarFilms: FetchedData<Film[]>,
  favoriteFilms: FetchedData<Film[]>,
  filter: string,
  authorization: {
    status:  ValuesOf<typeof AuthorizationStatus>,
    info: AuthoarizationInfo | null
  }
};

export type Action = ReturnType<typeof setAuthorizationStatus>
  | ReturnType<typeof setAuthorizationInfo>
  | ReturnType<typeof setFilms>
  | ReturnType<typeof setFilmsFetchStatus>
  | ReturnType<typeof setPromoFilm>
  | ReturnType<typeof setPromoFetchStatus>
  | ReturnType<typeof setFilter>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;

export type ParamsWithId = {
  [key: string]: string,
  id: string
}

export type ValuesOf<T> = T[keyof T]

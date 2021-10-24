import { ActionType, AuthorizationStatus } from '../constants';
import { AuthoarizationInfo, FetchStatusType, Film, ValuesOf } from '../types/types';

export const setFilms = (films: Film[] | null) => ({
  type: ActionType.SetFilms,
  payload: {
    films,
  },
} as const);

export const setFilmsFetchStatus = (status: FetchStatusType) => ({
  type: ActionType.SetFilmsFetchStatus,
  payload: {
    status,
  },
} as const);


export const setPromoFilm = (promoFilm: Film | null) => ({
  type: ActionType.SetPromoFilm,
  payload: {
    promoFilm,
  },
} as const);

export const setPromoFetchStatus = (status: FetchStatusType) => ({
  type: ActionType.SetPromoFilmFetchStatus,
  payload: {
    status,
  },
} as const);

export const setFavoriteFilmsFetchStatus = (status: FetchStatusType) => ({
  type: ActionType.SetFavoriteFilmsFetchStatus,
  payload: {
    status,
  },
} as const);

export const setFavoriteFilms = (favoriteFilms: Film[] | null) => ({
  type: ActionType.SetFavoriteFilms,
  payload: {
    favoriteFilms,
  },
} as const);

export const resetFavoriteFilms = () => ({
  type: ActionType.ResetFavoriteFilms,
} as const);

export const setAuthorizationStatus = (status: ValuesOf<typeof AuthorizationStatus>) => ({
  type: ActionType.SetAuthorizationStatus,
  payload: {
    status,
  },
} as const);

export const setAuthorizationInfo = (info: AuthoarizationInfo | null) => ({
  type: ActionType.SetAuthorizationInfo,
  payload: {
    info,
  },
} as const);

export const setFilter = (filter: string) => ({
  type: ActionType.SetFilter,
  payload: {
    filter,
  },
} as const);

export const redirectToRoute = (route: string) => ({
  type: ActionType.Redirect,
  payload: {
    route,
  },
} as const);

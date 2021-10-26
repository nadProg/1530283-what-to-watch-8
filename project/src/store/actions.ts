import { ActionType, AuthorizationStatus } from '../constants';
import { AuthoarizationInfo, CommentGet, FetchStatusType, Film, ValuesOf } from '../types/types';

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

export const setFavoriteFilms = (favoriteFilms: Film[] | null) => ({
  type: ActionType.SetFavoriteFilms,
  payload: {
    favoriteFilms,
  },
} as const);

export const setFavoriteFilmsFetchStatus = (status: FetchStatusType) => ({
  type: ActionType.SetFavoriteFilmsFetchStatus,
  payload: {
    status,
  },
} as const);

export const setSimilarFilms = (similarFilms: Film[] | null) => ({
  type: ActionType.SetSimilarFilms,
  payload: {
    similarFilms,
  },
} as const);

export const setSimilarFilmsFetchStatus = (status: FetchStatusType) => ({
  type: ActionType.SetSimilarFilmsFetchStatus,
  payload: {
    status,
  },
} as const);

export const setCurrentFilm = (currentFilm: Film | null) => ({
  type: ActionType.SetCurrentFilm,
  payload: {
    currentFilm,
  },
} as const);

export const setCurrentFilmFetchStatus = (status: FetchStatusType) => ({
  type: ActionType.SetCurrentFilmFetchStatus,
  payload: {
    status,
  },
} as const);

export const setCurrentComments = (currentComments: CommentGet[] | null) => ({
  type: ActionType.SetCurrentComments,
  payload: {
    currentComments,
  },
} as const);

export const setCurrentCommentsFetchStatus = (status: FetchStatusType) => ({
  type: ActionType.SetCurrentCommentsFetchStatus,
  payload: {
    status,
  },
} as const);

export const setNewCommentFetchStatus = (status: FetchStatusType) => ({
  type: ActionType.SetNewCommentFetchStatus,
  payload: {
    status,
  },
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

import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../constants';
import { FetchStatusType, Film } from '../../types/types';

export const setAllFilms = createAction(ActionType.SetAllFilms, (allFilms: Film[] | null) => ({
  payload: {
    allFilms,
  },
}));

export const setAllFilmsFetchStatus = createAction(ActionType.SetAllFilmsFetchStatus, (status: FetchStatusType) => ({
  payload: {
    status,
  },
}));

export const setPromoFilm = createAction(ActionType.SetPromoFilm, (promoFilm: Film | null) => ({
  payload: {
    promoFilm,
  },
}));

export const setPromoFetchStatus = createAction(ActionType.SetPromoFilmFetchStatus, (status: FetchStatusType) => ({
  payload: {
    status,
  },
}));

export const setFavoriteFilms = createAction(ActionType.SetFavoriteFilms, (favoriteFilms: Film[] | null) => ({
  payload: {
    favoriteFilms,
  },
}));

export const setFavoriteFilmsFetchStatus = createAction(ActionType.SetFavoriteFilmsFetchStatus, (status: FetchStatusType) => ({
  payload: {
    status,
  },
}));

export const setSimilarFilms = createAction(ActionType.SetSimilarFilms, (similarFilms: Film[] | null) => ({
  payload: {
    similarFilms,
  },
}));

export const setSimilarFilmsFetchStatus = createAction(ActionType.SetSimilarFilmsFetchStatus, (status: FetchStatusType) => ({
  payload: {
    status,
  },
}));

export const setCurrentFilm = createAction(ActionType.SetCurrentFilm, (currentFilm: Film | null) => ({
  payload: {
    currentFilm,
  },
}));

export const setCurrentFilmFetchStatus = createAction(ActionType.SetCurrentFilmFetchStatus, (status: FetchStatusType) => ({
  payload: {
    status,
  },
}));

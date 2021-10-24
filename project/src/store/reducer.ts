import { Action, State } from '../types/types';
import { ActionType, FetchStatus } from '../constants';
import { initialState } from './initial-state';

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.SetAuthorizationStatus:
      return {
        ...state,
        authorization: {
          ...state.authorization,
          status: action.payload.status,
        },
      };

    case ActionType.SetAuthorizationInfo:
      return {
        ...state,
        authorization: {
          ...state.authorization,
          info: action.payload.info,
        },
      };

    case ActionType.SetFilms:
      return {
        ...state,
        films: {
          ...state.films,
          data: action.payload.films,
        },
      };

    case ActionType.SetFilmsFetchStatus:
      return {
        ...state,
        films: {
          ...state.films,
          status: action.payload.status,
        },
      };

    case ActionType.SetFavoriteFilms:
      return {
        ...state,
        favoriteFilms: {
          ...state.favoriteFilms,
          data: action.payload.favoriteFilms,
        },
      };

    case ActionType.SetFavoriteFilmsFetchStatus:
      return {
        ...state,
        favoriteFilms: {
          ...state.favoriteFilms,
          status: action.payload.status,
        },
      };

    case ActionType.ResetFavoriteFilms:
      return {
        ...state,
        favoriteFilms: {
          status: FetchStatus.Idle,
          data: null,
        },
      };

    case ActionType.SetCurrentComments:
      return {
        ...state,
        currentComments: {
          ...state.currentComments,
          data: action.payload.currentComments,
        },
      };

    case ActionType.SetCurrentCommentsFetchStatus:
      return {
        ...state,
        currentComments: {
          ...state.currentComments,
          status: action.payload.status,
        },
      };

    case ActionType.SetPromoFilm:
      return {
        ...state,
        promoFilm: {
          ...state.promoFilm,
          data: action.payload.promoFilm,
        },
      };

    case ActionType.SetPromoFilmFetchStatus:
      return {
        ...state,
        promoFilm: {
          ...state.promoFilm,
          status: action.payload.status,
        },
      };

    case ActionType.SetFilter:
      return {
        ...state,
        filter: action.payload.filter,
      };

    default:
      return state;
  }
};

export { reducer };

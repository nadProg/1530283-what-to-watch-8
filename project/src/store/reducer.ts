import { Action, State } from '../types/types';
import { ActionType } from '../constants';
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

    case ActionType.SetSimilarFilms:
      return {
        ...state,
        similarFilms: {
          ...state.similarFilms,
          data: action.payload.similarFilms,
        },
      };

    case ActionType.SetSimilarFilmsFetchStatus:
      return {
        ...state,
        similarFilms: {
          ...state.similarFilms,
          status: action.payload.status,
        },
      };


    case ActionType.SetCurrentFilm:
      return {
        ...state,
        currentFilm: {
          ...state.currentFilm,
          data: action.payload.currentFilm,
        },
      };

    case ActionType.SetCurrentFilmFetchStatus:
      return {
        ...state,
        currentFilm: {
          ...state.currentFilm,
          status: action.payload.status,
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

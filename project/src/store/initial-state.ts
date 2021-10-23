import { ALL_GENRES, AuthorizationStatus, FetchStatus } from '../constants';
import { comments } from '../mocks/comments';
import { State } from '../types/types';

const initialState: State = {
  films: {
    data: null,
    status: FetchStatus.Idle,
  },
  promoFilm: {
    data: null,
    status: FetchStatus.Idle,
  },
  currentFilm: {
    data: null,
    status: FetchStatus.Idle,
  },
  currentComments: {
    data: comments,
    status: FetchStatus.Succeeded,
  },
  similarFilms: {
    data: null,
    status: FetchStatus.Idle,
  },
  favoriteFilms: {
    data: null,
    status: FetchStatus.Idle,
  },
  filter: ALL_GENRES,
  authorization: {
    status: AuthorizationStatus.NotAuth,
    info: null,
  },
};

export {initialState};

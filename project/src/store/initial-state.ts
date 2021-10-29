import { ALL_GENRES, AuthorizationStatus, FetchStatus } from '../constants';
import { State } from '../types/types';

const initialState: State = {
  currentFilm: {
    data: null,
    status: FetchStatus.Idle,
  },
  currentComments: {
    data: null,
    status: FetchStatus.Idle,
  },
  newComment: {
    status: FetchStatus.Idle,
  },
  filter: ALL_GENRES,
  authorization: {
    status: AuthorizationStatus.Unknown,
    info: null,
  },
};

export {initialState};

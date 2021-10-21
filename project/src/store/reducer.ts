import { ActionType, ALL_GENRES } from '../constants';
import { Action, State } from '../types/types';
import { films } from '../mocks/films';

const initialState: State = {
  filter: ALL_GENRES,
  films,
};

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
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

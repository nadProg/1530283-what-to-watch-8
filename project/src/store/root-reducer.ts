import { combineReducers } from 'redux';
import { filmsReducer } from './films/films-reducer';

const rootReducer = combineReducers({
  films: filmsReducer,
  // comments: null,
  // filter: null,
  // authorization: null,
});

export {rootReducer};

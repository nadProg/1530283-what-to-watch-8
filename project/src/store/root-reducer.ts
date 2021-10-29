import { combineReducers } from 'redux';
import { authorizationReducer } from './authorization/authorization-reducer';
import { commentsReducer } from './comments/comments-reducer';
import { filmsReducer } from './films/films-reducer';

const rootReducer = combineReducers({
  films: filmsReducer,
  comments: commentsReducer,
  // filter: null,
  authorization: authorizationReducer,
});

export {rootReducer};

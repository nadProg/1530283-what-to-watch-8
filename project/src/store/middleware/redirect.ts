import browserHistory from '../../browser-history';
import { Middleware } from '@reduxjs/toolkit';
import { ActionType } from '../../constants';
import { rootReducer } from '../root-reducer';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action) => {

        if (action.type === ActionType.Redirect) {
          browserHistory.push(action.payload.route);
        }

        return next(action);
      };

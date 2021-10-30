import { Middleware } from '@reduxjs/toolkit';
import { State } from '../../types/types';
import { ActionType } from '../../constants';
import browserHistory from '../../browser-history';

export const redirect: Middleware<unknown, State> =
  (_store) =>
    (next) =>
      (action) => {

        if (action.type === ActionType.Redirect) {
          browserHistory.push(action.payload.route);
        }

        return next(action);
      };

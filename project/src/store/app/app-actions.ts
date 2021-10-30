import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../constants';

export const redirectToRoute = createAction(ActionType.Redirect, (route: string) => ({
  payload: {
    route,
  },
}));

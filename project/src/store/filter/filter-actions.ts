import { createAction } from '@reduxjs/toolkit';
import { ActionType } from '../../constants';

export const setFilter = createAction(ActionType.SetFilter, (filter: string) => ({
  payload: {
    filter,
  },
}));

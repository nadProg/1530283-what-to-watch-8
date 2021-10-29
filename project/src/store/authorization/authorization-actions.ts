import { createAction } from '@reduxjs/toolkit';
import { ActionType, AuthorizationStatus } from '../../constants';
import { AuthoarizationInfo, ValuesOf } from '../../types/types';

export const setAuthorizationStatus = createAction(ActionType.SetAuthorizationStatus, (status: ValuesOf<typeof AuthorizationStatus>) => ({
  payload: {
    status,
  },
}));

export const setAuthorizationInfo = createAction(ActionType.SetAuthorizationInfo, (info: AuthoarizationInfo | null) => ({
  payload: {
    info,
  },
}));

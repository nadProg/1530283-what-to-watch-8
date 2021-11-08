import { createAction } from '@reduxjs/toolkit';
import { ActionType, AuthorizationStatus } from '../../constants';
import { AuthorizationInfo, ValuesOf } from '../../types/types';

export const setAuthorizationStatus = createAction(ActionType.SetAuthorizationStatus, (status: ValuesOf<typeof AuthorizationStatus>) => ({
  payload: {
    status,
  },
}));

export const setAuthorizationInfo = createAction(ActionType.SetAuthorizationInfo, (info: AuthorizationInfo | null) => ({
  payload: {
    info,
  },
}));

export const setAuthorizationErrorMessage = createAction(ActionType.SetAuthorizationError, (errorMessage: string) => ({
  payload: {
    errorMessage,
  },
}));

export const clearAuthorizationErrorMessage = createAction(ActionType.SetAuthorizationError, () => ({
  payload: {
    errorMessage: '',
  },
}));

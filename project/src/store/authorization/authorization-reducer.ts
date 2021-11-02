import { createReducer } from '@reduxjs/toolkit';
import { setAuthorizationErrorMessage, setAuthorizationInfo, setAuthorizationStatus } from './authorization-actions';
import { authorizationInitialState } from './authorization-initial-state';

const authorizationReducer = createReducer(authorizationInitialState, (build) => {
  build
    .addCase(setAuthorizationInfo, (state, action) => {
      state.info = action.payload.info;
    })
    .addCase(setAuthorizationStatus, (state, action) => {
      state.status = action.payload.status;
    })
    .addCase(setAuthorizationErrorMessage, (state, action) => {
      state.errorMessage = action.payload.errorMessage;
    });
});

export {authorizationReducer};

import { internet, lorem, datatype } from 'faker';

import { AuthorizationStatus, UNKNOWN_ACTION } from '../../constants';
import { AuthoarizationInfo } from '../../types/types';
import { clearAuthorizationErrorMessage, setAuthorizationErrorMessage, setAuthorizationInfo, setAuthorizationStatus } from './authorization-actions';
import { authorizationInitialState } from './authorization-initial-state';
import { authorizationReducer } from './authorization-reducer';

const TEST_ERROR_MESSAGE = lorem.sentence();

const TEST_AUTHORIZATION_INFO: AuthoarizationInfo = {
  id: datatype.number(),
  email: internet.email(),
  name: internet.userName(),
  avatarUrl: internet.url(),
  token: datatype.string(),
};

describe('Reducer: Authorization', () => {
  it('without additional parameters should return initial state', () => {
    expect(authorizationReducer(void 0 , UNKNOWN_ACTION))
      .toEqual(authorizationInitialState);
  });

  it('should set authorization status', () => {
    expect(authorizationReducer(authorizationInitialState, setAuthorizationStatus(AuthorizationStatus.Auth)))
      .toEqual({
        ...authorizationInitialState,
        status: AuthorizationStatus.Auth,
      });
  });

  it('should set authorization error message', () => {
    expect(authorizationReducer(authorizationInitialState, setAuthorizationErrorMessage(TEST_ERROR_MESSAGE)))
      .toEqual({
        ...authorizationInitialState,
        errorMessage: TEST_ERROR_MESSAGE,
      });
  });

  it('should clear authorization error message', () => {
    expect(authorizationReducer({
      ...authorizationInitialState,
      errorMessage: TEST_ERROR_MESSAGE,
    }, clearAuthorizationErrorMessage()))
      .toEqual({
        ...authorizationInitialState,
        errorMessage: '',
      });
  });

  it('should set authorization info', () => {
    expect(authorizationReducer(authorizationInitialState, setAuthorizationInfo(TEST_AUTHORIZATION_INFO)))
      .toEqual({
        ...authorizationInitialState,
        info: TEST_AUTHORIZATION_INFO,
      });
  });
});

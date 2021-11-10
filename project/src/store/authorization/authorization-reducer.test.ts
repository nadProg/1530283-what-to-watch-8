import { lorem } from 'faker';
import { AuthorizationStatus, UNKNOWN_ACTION } from '../../constants';
import { createMockAuthorizationInfo } from '../../mocks/authorization';
import { clearAuthorizationErrorMessage, setAuthorizationErrorMessage, setAuthorizationInfo, setAuthorizationStatus } from './authorization-actions';
import { authorizationInitialState } from './authorization-initial-state';
import { authorizationReducer } from './authorization-reducer';

const mockErrorMessage = lorem.sentence();

const mockAuthorizationInfo = createMockAuthorizationInfo();

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
    expect(authorizationReducer(authorizationInitialState, setAuthorizationErrorMessage(mockErrorMessage)))
      .toEqual({
        ...authorizationInitialState,
        errorMessage: mockErrorMessage,
      });
  });

  it('should clear authorization error message', () => {
    expect(authorizationReducer({
      ...authorizationInitialState,
      errorMessage: mockErrorMessage,
    }, clearAuthorizationErrorMessage()))
      .toEqual({
        ...authorizationInitialState,
        errorMessage: '',
      });
  });

  it('should set authorization info', () => {
    expect(authorizationReducer(authorizationInitialState, setAuthorizationInfo(mockAuthorizationInfo)))
      .toEqual({
        ...authorizationInitialState,
        info: mockAuthorizationInfo,
      });
  });
});

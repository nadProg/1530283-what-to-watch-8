import { AuthorizationStatus } from '../../constants';
import { AuthorizationInfo, ValuesOf } from '../../types/types';

type AuthorizationState = {
  status:  ValuesOf<typeof AuthorizationStatus>,
  info: AuthorizationInfo | null,
  errorMessage: string,
}

const authorizationInitialState: AuthorizationState = {
  status: AuthorizationStatus.Unknown,
  info: null,
  errorMessage: '',
};

export {authorizationInitialState};

import { AuthorizationStatus } from '../../constants';
import { AuthoarizationInfo, ValuesOf } from '../../types/types';

type AuthorizationState = {
  status:  ValuesOf<typeof AuthorizationStatus>,
  info: AuthoarizationInfo | null,
  errorMessage: string,
}

const authorizationInitialState: AuthorizationState = {
  status: AuthorizationStatus.Unknown,
  info: null,
  errorMessage: '',
};

export {authorizationInitialState};

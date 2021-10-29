import { AuthorizationStatus } from '../../constants';
import { AuthoarizationInfo, ValuesOf } from '../../types/types';

type AuthorizationState = {
  status:  ValuesOf<typeof AuthorizationStatus>,
  info: AuthoarizationInfo | null
}

const authorizationInitialState: AuthorizationState = {
  status: AuthorizationStatus.Unknown,
  info: null,
};

export {authorizationInitialState};

import { AuthorizationStatus } from '../../constants';
import { State, ValuesOf } from '../../types/types';

export const getAuthorizationStatus = ({ authorization }: State): ValuesOf<typeof AuthorizationStatus> => authorization.status;

export const getAuthorizationErrorMessage = ({ authorization }: State): string => authorization.errorMessage;

export const getUserAvatar = ({ authorization }: State): string | undefined => authorization.info?.avatarUrl;

import { AuthorizationStatus } from '../../constants';
import { AuthoarizationInfo, State, ValuesOf } from '../../types/types';

export const getAuhorizationInfo = ({ authorization }: State): AuthoarizationInfo | null => authorization.info;

export const getAuhorizationStatus = ({ authorization }: State): ValuesOf<typeof AuthorizationStatus> => authorization.status;

export const getUserAvatar = ({ authorization }: State): string | undefined => authorization.info?.avatarUrl;

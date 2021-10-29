import { ActionType, AuthorizationStatus } from '../constants';
import { AuthoarizationInfo, CommentGet, FetchStatusType, ValuesOf } from '../types/types';

export const setCurrentComments = (currentComments: CommentGet[] | null) => ({
  type: ActionType.SetCurrentComments,
  payload: {
    currentComments,
  },
} as const);

export const setCurrentCommentsFetchStatus = (status: FetchStatusType) => ({
  type: ActionType.SetCurrentCommentsFetchStatus,
  payload: {
    status,
  },
} as const);

export const setNewCommentFetchStatus = (status: FetchStatusType) => ({
  type: ActionType.SetNewCommentFetchStatus,
  payload: {
    status,
  },
} as const);

export const setAuthorizationStatus = (status: ValuesOf<typeof AuthorizationStatus>) => ({
  type: ActionType.SetAuthorizationStatus,
  payload: {
    status,
  },
} as const);

export const setAuthorizationInfo = (info: AuthoarizationInfo | null) => ({
  type: ActionType.SetAuthorizationInfo,
  payload: {
    info,
  },
} as const);

export const setFilter = (filter: string) => ({
  type: ActionType.SetFilter,
  payload: {
    filter,
  },
} as const);

export const redirectToRoute = (route: string) => ({
  type: ActionType.Redirect,
  payload: {
    route,
  },
} as const);

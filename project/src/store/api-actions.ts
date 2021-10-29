import { APIRoute, AppRoute, AuthorizationStatus, FetchStatus } from '../constants';
import { adaptAuthorizationInfoToClient } from '../services/adapters';
import { CommentGet, CommentPost, ServerAuthInfo, ThunkActionResult, User } from '../types/types';
import { setAuthorizationInfo, setAuthorizationStatus,  redirectToRoute, setCurrentCommentsFetchStatus, setCurrentComments, setNewCommentFetchStatus } from './actions';
import toast from 'react-hot-toast';
import { dropToken, saveToken } from '../services/token';

export const getСurrentComments = (filmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setCurrentCommentsFetchStatus(FetchStatus.Loading));

    try {
      const { data: comments } = await api.get<CommentGet[]>(APIRoute.Comments(filmId));

      dispatch(setCurrentComments(comments));
      dispatch(setCurrentCommentsFetchStatus(FetchStatus.Succeeded));

    } catch (error) {
      dispatch(setCurrentCommentsFetchStatus(FetchStatus.Failed));
    }
  };

export const postComment = (filmId: number, formData: CommentPost): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setNewCommentFetchStatus(FetchStatus.Loading));

    try {
      const { data: comments } = await api.post<CommentGet[]>(APIRoute.Comments(filmId), formData);

      dispatch(setCurrentComments(comments));
      dispatch(setNewCommentFetchStatus(FetchStatus.Succeeded));
      dispatch(setCurrentCommentsFetchStatus(FetchStatus.Succeeded));
      dispatch(redirectToRoute(AppRoute.Film(filmId)));

    } catch (error) {
      toast.error('Failed to add review');
      dispatch(setNewCommentFetchStatus(FetchStatus.Failed));
    }
  };

export const getLogin = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data: serverAuthorizationInfo } =
        await api.get<ServerAuthInfo>(APIRoute.Login());

      const authorizationInfo = adaptAuthorizationInfoToClient(serverAuthorizationInfo);

      dispatch(setAuthorizationInfo(authorizationInfo));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));

    } catch {
      dropToken();
      dispatch(setAuthorizationStatus(AuthorizationStatus.NotAuth));
    }
  };

export const postLogin = (user: User): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data: serverAuthorizationInfo } =
        await api.post<ServerAuthInfo>(APIRoute.Login(), user);

      const authorizationInfo = adaptAuthorizationInfoToClient(serverAuthorizationInfo);

      saveToken(authorizationInfo.token);
      dispatch(redirectToRoute(AppRoute.Root()));
      dispatch(setAuthorizationInfo(authorizationInfo));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));

    } catch (error) {
      toast.error('Login is failed');
    }
  };

export const deleteLogout = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      await api.delete(APIRoute.Logout());
      dropToken();
      dispatch(setAuthorizationInfo(null));
      dispatch(setAuthorizationStatus(AuthorizationStatus.NotAuth));

    } catch {
      toast.error('Logout is falied');
    }
  };

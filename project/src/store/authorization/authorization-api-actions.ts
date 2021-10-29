import toast from 'react-hot-toast';
import { APIRoute, AppRoute, AuthorizationStatus } from '../../constants';
import { ServerAuthInfo, ThunkActionResult, User } from '../../types/types';
import { adaptAuthorizationInfoToClient } from '../../services/adapters';
import { dropToken, saveToken } from '../../services/token';
import { redirectToRoute } from '../app/app-actions';
import { clearAuthorizationError, setAuthorizationError, setAuthorizationInfo, setAuthorizationStatus } from './authorization-actions';

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
    dispatch(clearAuthorizationError());

    try {
      const { data: serverAuthorizationInfo } =
        await api.post<ServerAuthInfo>(APIRoute.Login(), user);

      const authorizationInfo = adaptAuthorizationInfoToClient(serverAuthorizationInfo);

      saveToken(authorizationInfo.token);
      dispatch(redirectToRoute(AppRoute.Root()));
      dispatch(setAuthorizationInfo(authorizationInfo));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));

    } catch (error) {
      if (error instanceof Error ) {
        dispatch(setAuthorizationError(error.message));
      } else {
        toast.error('Unknown error');
      }
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

import toast from 'react-hot-toast';
import { APIRoute, AppRoute, AuthorizationStatus, FetchStatus } from '../../constants';
import { ServerAuthInfo, ThunkActionResult, Login } from '../../types/types';
import { adaptAuthorizationInfoToClient } from '../../services/adapters';
import { dropToken, saveToken } from '../../services/token';
import { redirectToRoute } from '../app/app-actions';
import { clearAuthorizationErrorMessage, setAuthorizationErrorMessage, setAuthorizationInfo, setAuthorizationStatus } from './authorization-actions';
import { setCurrentFilmFetchStatus, setPromoFilmFetchStatus } from '../films/films-actions';

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

export const postLogin = (user: Login): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(clearAuthorizationErrorMessage());

    try {
      const { data: serverAuthorizationInfo } =
        await api.post<ServerAuthInfo>(APIRoute.Login(), user);

      const authorizationInfo = adaptAuthorizationInfoToClient(serverAuthorizationInfo);

      saveToken(authorizationInfo.token);
      dispatch(redirectToRoute(AppRoute.Root()));
      dispatch(setAuthorizationInfo(authorizationInfo));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));

    } catch (error) {
      dispatch(setAuthorizationErrorMessage((error as Error).message));
    }
  };

export const deleteLogout = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      await api.delete(APIRoute.Logout());
      dropToken();
      dispatch(setAuthorizationInfo(null));
      dispatch(setAuthorizationStatus(AuthorizationStatus.NotAuth));
      dispatch(setPromoFilmFetchStatus(FetchStatus.Idle));
      dispatch(setCurrentFilmFetchStatus(FetchStatus.Idle));
    } catch {
      toast.error('Logout is falied');
    }
  };

import { APIRoute, AppRoute, AuthorizationStatus, FetchStatus } from '../constants';
import { adaptAuthorizationInfoToClient, adaptFilmToClient } from '../services/adapters';
import { CommentGet, ServerAuthInfo, ServerFilm, ThunkActionResult, User } from '../types/types';
import { setFilms, setFilmsFetchStatus, setPromoFilm, setPromoFetchStatus, setAuthorizationInfo, setAuthorizationStatus, setFavoriteFilms, setFavoriteFilmsFetchStatus, redirectToRoute, setCurrentCommentsFetchStatus, setCurrentComments, setCurrentFilmFetchStatus, setCurrentFilm, setSimilarFilmsFetchStatus, setSimilarFilms } from './actions';
import toast from 'react-hot-toast';
import { dropToken, saveToken } from '../services/token';

export const getFilms = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setFilmsFetchStatus(FetchStatus.Loading));

    try {
      const { data: serverFilms } = await api.get<ServerFilm[]>(APIRoute.Films());
      const films = serverFilms.map((serverFilm) => adaptFilmToClient(serverFilm));

      dispatch(setFilms(films));
      dispatch(setFilmsFetchStatus(FetchStatus.Succeeded));

    } catch (error) {
      dispatch(setFilmsFetchStatus(FetchStatus.Failed));
    }
  };

export const getPromoFilm = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setPromoFetchStatus(FetchStatus.Loading));

    try {
      const { data: serverPromoFilm } = await api.get<ServerFilm>(APIRoute.PromoFilm());
      const promoFilm = adaptFilmToClient(serverPromoFilm);

      dispatch(setPromoFilm(promoFilm));
      dispatch(setPromoFetchStatus(FetchStatus.Succeeded));

    } catch (error) {
      dispatch(setPromoFetchStatus(FetchStatus.Failed));
    }
  };

export const getFavoriteFilms = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setFavoriteFilmsFetchStatus(FetchStatus.Loading));

    try {
      const { data: serverFilms } = await api.get<ServerFilm[]>(APIRoute.FavoriteFilms());
      const films = serverFilms.map((serverFilm) => adaptFilmToClient(serverFilm));

      dispatch(setFavoriteFilms(films));
      dispatch(setFavoriteFilmsFetchStatus(FetchStatus.Succeeded));

    } catch (error) {
      dispatch(setFavoriteFilmsFetchStatus(FetchStatus.Failed));
    }
  };


export const getSimilarFilms = (id: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setSimilarFilmsFetchStatus(FetchStatus.Loading));

    try {
      const { data: serverFilms } = await api.get<ServerFilm[]>(APIRoute.SimilarFilms(id));
      const similarFilms = serverFilms.map((serverFilm) => adaptFilmToClient(serverFilm));

      dispatch(setSimilarFilms(similarFilms));
      dispatch(setSimilarFilmsFetchStatus(FetchStatus.Succeeded));

    } catch (error) {
      dispatch(setSimilarFilmsFetchStatus(FetchStatus.Failed));
    }
  };

export const getСurrentFilm = (filmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setCurrentFilmFetchStatus(FetchStatus.Loading));

    try {
      const { data: serverFilm } = await api.get<ServerFilm>(APIRoute.Film(filmId));
      const currentFilm = adaptFilmToClient(serverFilm);

      dispatch(setCurrentFilm(currentFilm));
      dispatch(setCurrentFilmFetchStatus(FetchStatus.Succeeded));

    } catch (error) {
      dispatch(setCurrentFilmFetchStatus(FetchStatus.Failed));
    }
  };

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

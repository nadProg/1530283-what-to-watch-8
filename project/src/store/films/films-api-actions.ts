import { APIRoute, FetchStatus } from '../../constants';
import { FavoriteStatusType, ServerFilm, ThunkActionResult } from '../../types/types';
import { adaptFilmToClient } from '../../services/adapters';
import { setAllFilms, setAllFilmsFetchStatus, setCurrentFilm, setCurrentFilmFetchStatus, setFavoriteFilms, setFavoriteFilmsFetchStatus, setPromoFilmFetchStatus, setPromoFilm, setSimilarFilms, setSimilarFilmsFetchStatus } from './films-actions';
import toast from 'react-hot-toast';

export const getAllFilms = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setAllFilmsFetchStatus(FetchStatus.Loading));

    try {
      const { data: serverFilms } = await api.get<ServerFilm[]>(APIRoute.Films());
      const films = serverFilms.map((serverFilm) => adaptFilmToClient(serverFilm));

      dispatch(setAllFilms(films));
      dispatch(setAllFilmsFetchStatus(FetchStatus.Succeeded));

    } catch (error) {
      dispatch(setAllFilmsFetchStatus(FetchStatus.Failed));
    }
  };

export const getPromoFilm = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setPromoFilmFetchStatus(FetchStatus.Loading));

    try {
      const { data: serverPromoFilm } = await api.get<ServerFilm>(APIRoute.PromoFilm());
      const promoFilm = adaptFilmToClient(serverPromoFilm);

      dispatch(setPromoFilm(promoFilm));
      dispatch(setPromoFilmFetchStatus(FetchStatus.Succeeded));

    } catch (error) {
      dispatch(setPromoFilmFetchStatus(FetchStatus.Failed));
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

export const postFavoriteFilm = (id:string | number, newStatus: FavoriteStatusType): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    try {
      const { data: serverFilm } = await api.post<ServerFilm>(APIRoute.FavoriteFilm(id, newStatus));
      const film = adaptFilmToClient(serverFilm);

      if (_getState().films.promoFilm.data?.id === film.id) {
        dispatch(setPromoFilm(film));
      }

      if (_getState().films.currentFilm.data?.id === film.id) {
        dispatch(setCurrentFilm(film));
      }
    } catch (error) {
      toast.error('Favorite status was not changed');
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

export const getCurrentFilm = (filmId: number): ThunkActionResult =>
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

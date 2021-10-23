import { APIRoute, FetchStatus } from '../constants';
import { adaptFilmToClient } from '../services/adapters';
import { ServerFilm, ThunkActionResult } from '../types/types';
import { setFilms, setFilmsFetchStatus, setPromoFilm, setPromoFetchStatus } from './actions';

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

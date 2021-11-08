import thunk from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { datatype } from 'faker';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, State } from '../../types/types';
import { APIRoute, FavoriteStatus, FetchStatus } from '../../constants';
import { createAPI } from '../../services/api';
import { adaptFilmToClient } from '../../services/adapters';
import { setAllFilms, setAllFilmsFetchStatus, setCurrentFilm, setCurrentFilmFetchStatus, setFavoriteFilms, setFavoriteFilmsFetchStatus, setPromoFilm, setPromoFilmFetchStatus, setSimilarFilms, setSimilarFilmsFetchStatus } from './films-actions';
import { getAllFilms, getFavoriteFilms, getPromoFilm, getSimilarFilms, getCurrentFilm, postFavoriteFilm } from './films-api-actions';
import { createMockServerFilm, createMockServerFilms } from '../../mocks/films';

const mockFilmId = datatype.number();
const mockServerFilm = createMockServerFilm();
const adaptedMockFilm = adaptFilmToClient(mockServerFilm);
const mockServerFilms = createMockServerFilms();
const adaptedMockFilms = mockServerFilms.map((serverFilm) => adaptFilmToClient(serverFilm));

describe('Api-actions: Films', () => {
  const fakeUnauthorizedCallback = jest.fn();
  const api = createAPI(fakeUnauthorizedCallback());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

  it('should handle succeed get all films request', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Films())
      .reply(200, mockServerFilms);

    await store.dispatch(getAllFilms());

    expect(store.getActions()).toEqual([
      setAllFilmsFetchStatus(FetchStatus.Loading),
      setAllFilms(adaptedMockFilms),
      setAllFilmsFetchStatus(FetchStatus.Succeeded),
    ]);
  });

  it('should handle failed get all films request', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Films())
      .reply(404);

    await store.dispatch(getAllFilms());

    expect(store.getActions()).toEqual([
      setAllFilmsFetchStatus(FetchStatus.Loading),
      setAllFilmsFetchStatus(FetchStatus.Failed),
    ]);
  });

  it('should handle succeed get favorite films request', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.FavoriteFilms())
      .reply(200, mockServerFilms);

    await store.dispatch(getFavoriteFilms());

    expect(store.getActions()).toEqual([
      setFavoriteFilmsFetchStatus(FetchStatus.Loading),
      setFavoriteFilms(adaptedMockFilms),
      setFavoriteFilmsFetchStatus(FetchStatus.Succeeded),
    ]);
  });

  it('should handle failed get favorite films request', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.FavoriteFilms())
      .reply(404);

    await store.dispatch(getFavoriteFilms());

    expect(store.getActions()).toEqual([
      setFavoriteFilmsFetchStatus(FetchStatus.Loading),
      setFavoriteFilmsFetchStatus(FetchStatus.Failed),
    ]);
  });

  it('should handle succeed get similar films request', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.SimilarFilms(mockFilmId))
      .reply(200, mockServerFilms);

    await store.dispatch(getSimilarFilms(mockFilmId));

    expect(store.getActions()).toEqual([
      setSimilarFilmsFetchStatus(FetchStatus.Loading),
      setSimilarFilms(adaptedMockFilms),
      setSimilarFilmsFetchStatus(FetchStatus.Succeeded),
    ]);
  });

  it('should handle failed get similar films request', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.SimilarFilms(mockFilmId))
      .reply(404);

    await store.dispatch(getSimilarFilms(mockFilmId));

    expect(store.getActions()).toEqual([
      setSimilarFilmsFetchStatus(FetchStatus.Loading),
      setSimilarFilmsFetchStatus(FetchStatus.Failed),
    ]);
  });

  it('should handle succeed get promo film request', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.PromoFilm())
      .reply(200, mockServerFilm);

    await store.dispatch(getPromoFilm());

    expect(store.getActions()).toEqual([
      setPromoFilmFetchStatus(FetchStatus.Loading),
      setPromoFilm(adaptedMockFilm),
      setPromoFilmFetchStatus(FetchStatus.Succeeded),
    ]);
  });

  it('should handle failed get promo film request', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.PromoFilm())
      .reply(404);

    await store.dispatch(getPromoFilm());

    expect(store.getActions()).toEqual([
      setPromoFilmFetchStatus(FetchStatus.Loading),
      setPromoFilmFetchStatus(FetchStatus.Failed),
    ]);
  });

  it('should handle succeed get current film request', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Film(mockFilmId))
      .reply(200, mockServerFilm);

    await store.dispatch(getCurrentFilm(mockFilmId));

    expect(store.getActions()).toEqual([
      setCurrentFilmFetchStatus(FetchStatus.Loading),
      setCurrentFilm(adaptedMockFilm),
      setCurrentFilmFetchStatus(FetchStatus.Succeeded),
    ]);
  });

  it('should handle failed get current film request', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Film(mockFilmId))
      .reply(404);

    await store.dispatch(getCurrentFilm(mockFilmId));

    expect(store.getActions()).toEqual([
      setCurrentFilmFetchStatus(FetchStatus.Loading),
      setCurrentFilmFetchStatus(FetchStatus.Failed),
    ]);
  });

  it('should handle succeed post favorite film request', async () => {
    const store = mockStore({
      films: {
        promoFilm: {
          data: {
            ...adaptedMockFilm,
          },
        },
        currentFilm: {
          data: {
            ...adaptedMockFilm,
          },
        },
      },
    });

    mockAPI
      .onPost(APIRoute.FavoriteFilm(adaptedMockFilm.id, FavoriteStatus.Favorite))
      .reply(200, mockServerFilm);

    await store.dispatch(postFavoriteFilm(adaptedMockFilm.id, FavoriteStatus.Favorite));

    expect(store.getActions()).toEqual([
      setPromoFilm(adaptedMockFilm),
      setCurrentFilm(adaptedMockFilm),
    ]);
  });

  it('should handle failed post favorite film request', async () => {
    const store = mockStore();
    mockAPI
      .onPost(APIRoute.FavoriteFilm(mockFilmId, FavoriteStatus.Favorite))
      .reply(401);

    await store.dispatch(postFavoriteFilm(mockFilmId, FavoriteStatus.Favorite));

    expect(store.getActions()).toEqual([]);
  });
});

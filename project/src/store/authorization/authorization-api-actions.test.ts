import thunk from 'redux-thunk';
import { datatype, internet } from 'faker';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import { APIRoute, AppRoute, AuthorizationStatus, AUTH_TOKEN_KEY_NAME, FetchStatus } from '../../constants';
import { createAPI } from '../../services/api';
import { Action, Login, ServerAuthInfo, State } from '../../types/types';
import { adaptAuthorizationInfoToClient } from '../../services/adapters';
import { setAuthorizationInfo, setAuthorizationStatus, clearAuthorizationErrorMessage, setAuthorizationErrorMessage } from './authorization-actions';
import { deleteLogout, getLogin, postLogin } from './authorization-api-actions';
import { redirectToRoute } from '../app/app-actions';
import { setCurrentFilmFetchStatus, setPromoFilmFetchStatus } from '../films/films-actions';

const mockLoginData: Login = {
  email: internet.email(),
  password: internet.password(),
};

const mockServerAuthorizationInfo: ServerAuthInfo = {
  id: datatype.number(),
  email: internet.email(),
  name: internet.userName(),
  'avatar_url': internet.url(),
  token: datatype.uuid(),
};

const adaptedAuhtorizationInfo = adaptAuthorizationInfoToClient(mockServerAuthorizationInfo);

describe('Api-actions: Authorization', () => {
  const fakeUnauthorizedCallback = jest.fn();
  const api = createAPI(fakeUnauthorizedCallback());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);


  it('should handle succeed get login', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login())
      .reply(200, mockServerAuthorizationInfo);

    await store.dispatch(getLogin());

    expect(store.getActions()).toEqual([
      setAuthorizationInfo(adaptedAuhtorizationInfo),
      setAuthorizationStatus(AuthorizationStatus.Auth),
    ]);
  });

  it('should handle failed get login', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login())
      .reply(401);


    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(getLogin());

    expect(store.getActions()).toEqual([
      setAuthorizationStatus(AuthorizationStatus.NotAuth),
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
  });

  it('should handle succeed post login', async () => {
    const store = mockStore();
    mockAPI
      .onPost(APIRoute.Login(), mockLoginData)
      .reply(200, mockServerAuthorizationInfo);

    Storage.prototype.setItem = jest.fn();

    await store.dispatch(postLogin(mockLoginData));

    expect(store.getActions()).toEqual([
      clearAuthorizationErrorMessage(),
      redirectToRoute(AppRoute.Root()),
      setAuthorizationInfo(adaptedAuhtorizationInfo),
      setAuthorizationStatus(AuthorizationStatus.Auth),
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, adaptedAuhtorizationInfo.token);
  });

  it('should handle failed post login', async () => {
    const store = mockStore();
    mockAPI
      .onPost(APIRoute.Login(), mockLoginData)
      .reply(401);

    await store.dispatch(postLogin(mockLoginData));

    expect(store.getActions()).toEqual([
      clearAuthorizationErrorMessage(),
      setAuthorizationErrorMessage('Request failed with status code 401'),
    ]);
  });

  it('should handle succeed delete logout', async () => {
    const store = mockStore();
    mockAPI
      .onDelete(APIRoute.Logout())
      .reply(204);

    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(deleteLogout());

    expect(store.getActions()).toEqual([
      setAuthorizationInfo(null),
      setAuthorizationStatus(AuthorizationStatus.NotAuth),
      setPromoFilmFetchStatus(FetchStatus.Idle),
      setCurrentFilmFetchStatus(FetchStatus.Idle),
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
  });

  it('should handle failed delete logout', async () => {
    const store = mockStore();
    mockAPI
      .onDelete(APIRoute.Logout())
      .reply(400);

    await store.dispatch(deleteLogout());

    expect(store.getActions()).toEqual([]);
  });
});


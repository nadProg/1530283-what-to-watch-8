import { AnyAction } from 'redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, UNKNOWN_ACTION } from '../../constants';
import { State } from '../../types/types';
import { redirect } from './redirect';
import { redirectToRoute } from '../app/app-actions';

const fakeHistory = {
  location: {
    pathname: '',
  },
  push(path: string) {
    this.location.pathname = path;
  },
};

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

jest.mock('../../browser-history', () => fakeHistory);

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /login', () => {
    store.dispatch(redirectToRoute(AppRoute.Login()));

    expect(fakeHistory.location.pathname).toBe(AppRoute.Login());
    expect(store.getActions()).toEqual([
      redirectToRoute(AppRoute.Login()),
    ]);
  });

  it('should not to be redirect /login because of unknown action', () => {
    store.dispatch({
      ...UNKNOWN_ACTION,
      payload: AppRoute.Login(),
    });

    expect(fakeHistory.location.pathname).not.toBe(AppRoute.Login());
  });
});

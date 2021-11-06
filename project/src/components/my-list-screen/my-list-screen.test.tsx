import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { State } from '../../types/types';
import { AuthorizationStatus, FetchStatus } from '../../constants';
import { createMockFilms } from '../../mocks/films';
import MyListScreen from './my-list-screen';

const history = createMemoryHistory();

const mockFilms = createMockFilms();

const mockStore = configureMockStore<State>();

describe('Component: MyListScreen', () => {
  it('should render correctly when films are fetched successfully', () => {
    const successStore = mockStore({
      films: {
        favoriteFilms: {
          data: mockFilms,
          status: FetchStatus.Succeeded,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
    });

    successStore.dispatch = jest.fn();

    render(
      <Provider store={successStore}>
        <Router history={history}>
          <MyListScreen />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/My List/i)).toBeInTheDocument();
    expect(screen.queryByText(/This page does not exist/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Go to main page/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Loading Screen/i)).not.toBeInTheDocument();

    expect(successStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should show error when load is failed', () => {
    const errorStore = mockStore({
      films: {
        favoriteFilms: {
          data: null,
          status: FetchStatus.Failed,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
    });

    errorStore.dispatch = jest.fn();

    render(
      <Provider store={errorStore}>
        <Router history={history}>
          <MyListScreen />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This page does not exist/i)).toBeInTheDocument();
    expect(screen.queryByText(/Go to main page/i)).toBeInTheDocument();

    expect(screen.queryByText(/Loading Screen/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/My List/i)).not.toBeInTheDocument();

    expect(errorStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should loading screen when no current film is present at the time', () => {
    const initialStore = mockStore({
      films: {
        favoriteFilms: {
          data: null,
          status: FetchStatus.Idle,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
    });

    initialStore.dispatch = jest.fn();

    render(
      <Provider store={initialStore}>
        <Router history={history}>
          <MyListScreen />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Loading Screen/i)).toBeInTheDocument();
    expect(screen.queryByText(/This page does not exist/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Go to main page/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/My List/i)).not.toBeInTheDocument();

    expect(initialStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should dispatch load new current film', () => {
    const initialStore = mockStore({
      films: {
        favoriteFilms: {
          data: null,
          status: FetchStatus.Idle,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
    });

    initialStore.dispatch = jest.fn();

    render(
      <Provider store={initialStore}>
        <Router history={history}>
          <MyListScreen />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Loading Screen/i)).toBeInTheDocument();
    expect(screen.queryByText(/This page does not exist/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Go to main page/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/My List/i)).not.toBeInTheDocument();

    expect(initialStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should dispatch fetch events when new id is present in the path', () => {
    const store = mockStore({
      films: {
        favoriteFilms: {
          data: mockFilms,
          status: FetchStatus.Idle,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <MyListScreen />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Loading Screen/i)).toBeInTheDocument();
    expect(screen.queryByText(/This page does not exist/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Go to main page/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/My List/i)).not.toBeInTheDocument();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });
});

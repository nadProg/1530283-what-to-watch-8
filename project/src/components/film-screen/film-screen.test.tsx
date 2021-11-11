import { Provider } from 'react-redux';
import ReactRouter from 'react-router';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { State } from '../../types/types';
import { AppRoute, AuthorizationStatus, FetchStatus } from '../../constants';
import { createMockFilm, createMockFilms } from '../../mocks/films';
import { createMockComments } from '../../mocks/comments';
import FilmScreen from './film-screen';

const history = createMemoryHistory();

const mockFilm = createMockFilm();
const mockFilms = createMockFilms();
const mockComments = createMockComments();

const mockStore = configureMockStore<State>();

describe('Component: FilmScreen', () => {
  beforeEach(() => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: String(mockFilm.id)});

    history.push(AppRoute.Film());
  });

  it('should render correctly when current is fetched successfully', () => {
    const successStore = mockStore({
      films: {
        similarFilms: {
          data: mockFilms,
          status: FetchStatus.Succeeded,
        },
        currentFilm: {
          data: mockFilm,
          status: FetchStatus.Succeeded,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      comments: {
        currentComments: {
          data: mockComments,
          status: FetchStatus.Succeeded,
        },
      },
    });

    successStore.dispatch = jest.fn();

    render(
      <Provider store={successStore}>
        <Router history={history}>
          <Route path={AppRoute.NotFound()} exact>
            <div data-testid="not-found-screen" />
          </Route>
          <Route path={AppRoute.Film()} exact>
            <FilmScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId('not-found-screen')).not.toBeInTheDocument();
    expect(screen.queryByText(/Loading Screen/i)).not.toBeInTheDocument();

    expect(screen.queryByText(/WTW/i)).toBeInTheDocument();

    expect(successStore.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should show error screen when no valid id is present', () => {
    const successStore = mockStore({
      films: {
        similarFilms: {
          data: mockFilms,
          status: FetchStatus.Succeeded,
        },
        currentFilm: {
          data: mockFilm,
          status: FetchStatus.Succeeded,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      comments: {
        currentComments: {
          data: mockComments,
          status: FetchStatus.Succeeded,
        },
      },
    });

    successStore.dispatch = jest.fn();

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({});

    render(
      <Provider store={successStore}>
        <Router history={history}>
          <Route path={AppRoute.NotFound()} exact>
            <div data-testid="not-found-screen" />
          </Route>
          <Route path={AppRoute.Film()} exact>
            <FilmScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId('not-found-screen')).toBeInTheDocument();

    expect(screen.queryByText(/Loading Screen/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/WTW/i)).not.toBeInTheDocument();
    expect(successStore.dispatch).toHaveBeenCalledTimes(3);
  });

  it('should show error when server responds with invalid data', () => {
    const successStore = mockStore({
      films: {
        similarFilms: {
          data: mockFilms,
          status: FetchStatus.Succeeded,
        },
        currentFilm: {
          data: null,
          status: FetchStatus.Succeeded,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      comments: {
        currentComments: {
          data: mockComments,
          status: FetchStatus.Succeeded,
        },
      },
    });

    successStore.dispatch = jest.fn();

    render(
      <Provider store={successStore}>
        <Router history={history}>
          <Route path={AppRoute.NotFound()} exact>
            <div data-testid="not-found-screen" />
          </Route>
          <Route path={AppRoute.Film()} exact>
            <FilmScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId('not-found-screen')).toBeInTheDocument();

    expect(screen.queryByText(/Loading Screen/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/WTW/i)).not.toBeInTheDocument();
  });

  it('should show error when server responds with fail', () => {
    const successStore = mockStore({
      films: {
        similarFilms: {
          data: mockFilms,
          status: FetchStatus.Succeeded,
        },
        currentFilm: {
          data: null,
          status: FetchStatus.Failed,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      comments: {
        currentComments: {
          data: mockComments,
          status: FetchStatus.Succeeded,
        },
      },
    });

    successStore.dispatch = jest.fn();

    render(
      <Provider store={successStore}>
        <Router history={history}>
          <Route path={AppRoute.NotFound()} exact>
            <div data-testid="not-found-screen" />
          </Route>
          <Route path={AppRoute.Film()} exact>
            <FilmScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId('not-found-screen')).toBeInTheDocument();

    expect(screen.queryByText(/Loading Screen/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/WTW/i)).not.toBeInTheDocument();
  });

  it('should loading screen when no current film is present at the time', () => {
    const initialStore = mockStore({
      films: {
        similarFilms: {
          data: null,
          status: FetchStatus.Idle,
        },
        currentFilm: {
          data: null,
          status: FetchStatus.Idle,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      comments: {
        currentComments: {
          data: null,
          status: FetchStatus.Idle,
        },
      },
    });

    initialStore.dispatch = jest.fn();

    render(
      <Provider store={initialStore}>
        <Router history={history}>
          <Route path={AppRoute.NotFound()} exact>
            <div data-testid="not-found-screen" />
          </Route>
          <Route path={AppRoute.Film()} exact>
            <FilmScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Loading Screen/i)).toBeInTheDocument();

    expect(screen.queryByTestId('not-found-screen')).not.toBeInTheDocument();
    expect(screen.queryByText(/WTW/i)).not.toBeInTheDocument();

    expect(initialStore.dispatch).toHaveBeenCalledTimes(3);
  });

  it('should dispatch load new current film', () => {
    const initialStore = mockStore({
      films: {
        similarFilms: {
          data: null,
          status: FetchStatus.Idle,
        },
        currentFilm: {
          data: null,
          status: FetchStatus.Idle,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      comments: {
        currentComments: {
          data: null,
          status: FetchStatus.Idle,
        },
      },
    });

    initialStore.dispatch = jest.fn();

    render(
      <Provider store={initialStore}>
        <Router history={history}>
          <Route path={AppRoute.NotFound()} exact>
            <div data-testid="not-found-screen" />
          </Route>
          <Route path={AppRoute.Film()} exact>
            <FilmScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Loading Screen/i)).toBeInTheDocument();

    expect(screen.queryByTestId('not-found-screen')).not.toBeInTheDocument();
    expect(screen.queryByText(/WTW/i)).not.toBeInTheDocument();

    expect(initialStore.dispatch).toHaveBeenCalledTimes(3);
  });

  it('should dispatch fetch events when new id is present in the path', () => {
    const store = mockStore({
      films: {
        similarFilms: {
          data: mockFilms,
          status: FetchStatus.Idle,
        },
        currentFilm: {
          data: mockFilm,
          status: FetchStatus.Idle,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      comments: {
        currentComments: {
          data: mockComments,
          status: FetchStatus.Idle,
        },
      },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <Route path={AppRoute.NotFound()} exact>
            <div data-testid="not-found-screen" />
          </Route>
          <Route path={AppRoute.Film()} exact>
            <FilmScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Loading Screen/i)).toBeInTheDocument();

    expect(screen.queryByTestId('not-found-screen')).not.toBeInTheDocument();
    expect(screen.queryByText(/WTW/i)).not.toBeInTheDocument();

    expect(store.dispatch).toHaveBeenCalledTimes(3);
  });
});

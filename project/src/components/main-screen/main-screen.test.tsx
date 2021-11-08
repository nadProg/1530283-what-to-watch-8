import { Provider } from 'react-redux';
import ReactRouter from 'react-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { State } from '../../types/types';
import { ALL_GENRES, AuthorizationStatus, CATALOG_PAGE_SIZE, FetchStatus } from '../../constants';
import { createMockFilm, createMockFilms } from '../../mocks/films';
import MainScreen from './main-screen';
import userEvent from '@testing-library/user-event';

const history = createMemoryHistory();

const mockFilm = createMockFilm();
const mockFilms = createMockFilms();

const mockStore = configureMockStore<State>();

describe('Component: Main', () => {
  it('should render correctly when current is fetched successfully', () => {
    const successStore = mockStore({
      films: {
        allFilms: {
          data: mockFilms,
          status: FetchStatus.Succeeded,
        },
        promoFilm: {
          data: mockFilm,
          status: FetchStatus.Succeeded,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      filter: ALL_GENRES,
    });

    successStore.dispatch = jest.fn();

    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: String(mockFilm.id)});

    render(
      <Provider store={successStore}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This page does not exist/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Go to main page/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Loading Screen/i)).not.toBeInTheDocument();

    expect(screen.queryByText(/WTW/i)).toBeInTheDocument();

    expect(successStore.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should show error when load is failed', () => {
    const errorStore = mockStore({
      films: {
        allFilms: {
          data: null,
          status: FetchStatus.Failed,
        },
        promoFilm: {
          data: null,
          status: FetchStatus.Failed,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      filter: mockFilms[0].genre,
    });

    errorStore.dispatch = jest.fn();

    render(
      <Provider store={errorStore}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This page does not exist/i)).toBeInTheDocument();
    expect(screen.queryByText(/Go to main page/i)).toBeInTheDocument();

    expect(screen.queryByText(/Loading Screen/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/WTW/i)).not.toBeInTheDocument();

    expect(errorStore.dispatch).toHaveBeenCalledTimes(0);
  });


  it('should loading screen when no current film is present at the time', () => {
    const initialStore = mockStore({
      films: {
        allFilms: {
          data: mockFilms,
          status: FetchStatus.Idle,
        },
        promoFilm: {
          data: mockFilm,
          status: FetchStatus.Idle,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      filter: mockFilms[0].genre,
    });

    initialStore.dispatch = jest.fn();

    render(
      <Provider store={initialStore}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Loading Screen/i)).toBeInTheDocument();

    expect(screen.queryByText(/This page does not exist/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Go to main page/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/WTW/i)).not.toBeInTheDocument();

    expect(initialStore.dispatch).toHaveBeenCalledTimes(2);
  });

  it('should dispatch load new current film', () => {
    const initialStore = mockStore({
      films: {
        allFilms: {
          data: null,
          status: FetchStatus.Idle,
        },
        promoFilm: {
          data: null,
          status: FetchStatus.Idle,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      filter: mockFilms[0].genre,
    });

    initialStore.dispatch = jest.fn();

    render(
      <Provider store={initialStore}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Loading Screen/i)).toBeInTheDocument();

    expect(screen.queryByText(/This page does not exist/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Go to main page/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/WTW/i)).not.toBeInTheDocument();

    expect(initialStore.dispatch).toHaveBeenCalledTimes(2);
  });

  it('should dispatch fetch events when new id is present in the path', () => {
    const store = mockStore({
      films: {
        allFilms: {
          data: mockFilms,
          status: FetchStatus.Idle,
        },
        promoFilm: {
          data: mockFilm,
          status: FetchStatus.Idle,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      filter: mockFilms[0].genre,
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Loading Screen/i)).toBeInTheDocument();

    expect(screen.queryByText(/This page does not exist/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Go to main page/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/WTW/i)).not.toBeInTheDocument();

    expect(store.dispatch).toHaveBeenCalledTimes(2);
  });

  it('should handle click on genre tab', () => {
    const successStore = mockStore({
      films: {
        allFilms: {
          data: mockFilms,
          status: FetchStatus.Succeeded,
        },
        promoFilm: {
          data: mockFilm,
          status: FetchStatus.Succeeded,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      filter: ALL_GENRES,
    });

    successStore.dispatch = jest.fn();

    render(
      <Provider store={successStore}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByText(ALL_GENRES));

    expect(successStore.dispatch).toBeCalledTimes(1);
  });

  it('should handle click on more button', () => {
    const successStore = mockStore({
      films: {
        allFilms: {
          data: mockFilms,
          status: FetchStatus.Succeeded,
        },
        promoFilm: {
          data: mockFilm,
          status: FetchStatus.Succeeded,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      filter: ALL_GENRES,
    });

    successStore.dispatch = jest.fn();

    render(
      <Provider store={successStore}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Show More/i)).toBeInTheDocument();

    for (let i = 0; i < Math.ceil(mockFilms.length / CATALOG_PAGE_SIZE); i++) {
      if (screen.queryByText(/Show More/i)) {
        userEvent.click(screen.getByText(/Show More/i));
      }
    }

    expect(screen.queryByText(/Show More/i)).not.toBeInTheDocument();
  });
});

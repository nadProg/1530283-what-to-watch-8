import { Provider } from 'react-redux';
import ReactRouter from 'react-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { datatype } from 'faker';
import { State } from '../../types/types';
import { AppRoute, AuthorizationStatus, FetchStatus } from '../../constants';
import App from './app';

const UNKNOWN_PATH = '/unknown-path';

const history = createMemoryHistory();

const mockId = datatype.number();

const mockStore = configureMockStore<State>();

const initialStore = mockStore({
  films: {
    allFilms: {
      status: FetchStatus.Idle,
    },
    promoFilm: {
      status: FetchStatus.Idle,
    },
    currentFilm: {
      status: FetchStatus.Idle,
    },
    favoriteFilms: {
      status: FetchStatus.Idle,
    },
    similarFilms: {
      status: FetchStatus.Idle,
    },
  },
  comments: {
    currentComments: {
      status: FetchStatus.Idle,
    },
    newComment: {
      status: FetchStatus.Idle,
    },
  },
  authorization: {
    status: AuthorizationStatus.Unknown,
  },
});

const userStore = mockStore({
  films: {
    allFilms: {
      status: FetchStatus.Idle,
    },
    promoFilm: {
      status: FetchStatus.Idle,
    },
    currentFilm: {
      status: FetchStatus.Idle,
    },
    favoriteFilms: {
      status: FetchStatus.Idle,
    },
    similarFilms: {
      status: FetchStatus.Idle,
    },
  },
  comments: {
    currentComments: {
      status: FetchStatus.Idle,
    },
    newComment: {
      status: FetchStatus.Idle,
    },
  },
  authorization: {
    status: AuthorizationStatus.Auth,
  },
});

initialStore.dispatch = jest.fn();
userStore.dispatch = jest.fn();

describe('Component: App', () => {
  beforeEach(() => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: String(mockId)});
  });

  it('should render correctly', () => {
    render(
      <Provider store={initialStore}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Loading Screen/i)).toBeInTheDocument();

    expect(screen.queryByText(/This page does not exist/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Go to main page/i)).not.toBeInTheDocument();
  });


  it('root screen should render correctly', () => {
    history.push(AppRoute.Root());

    render(
      <Provider store={userStore}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Loading Screen/i)).toBeInTheDocument();

    expect(screen.queryByText(/This page does not exist/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Go to main page/i)).not.toBeInTheDocument();
  });

  it('login screen should render correctly', () => {
    history.push(AppRoute.Login());

    render(
      <Provider store={userStore}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>);

    expect(screen.queryByText(/Loading Screen/i)).toBeInTheDocument();

    expect(screen.queryByText(/This page does not exist/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Go to main page/i)).not.toBeInTheDocument();
  });

  it('my list screen should render correctly', () => {
    history.push(AppRoute.MyList());

    render(
      <Provider store={userStore}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Loading Screen/i)).toBeInTheDocument();

    expect(screen.queryByText(/This page does not exist/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Go to main page/i)).not.toBeInTheDocument();
  });

  it('film screen should render correctly', () => {
    history.push(AppRoute.Film());

    render(
      <Provider store={userStore}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );
    expect(screen.queryByText(/Loading Screen/i)).toBeInTheDocument();

    expect(screen.queryByText(/This page does not exist/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Go to main page/i)).not.toBeInTheDocument();
  });

  it('add review screen should render correctly', () => {
    history.push(AppRoute.AddReview());

    render(
      <Provider store={userStore}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Loading Screen/i)).toBeInTheDocument();

    expect(screen.queryByText(/This page does not exist/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Go to main page/i)).not.toBeInTheDocument();
  });

  it('player screen should render correctly', () => {
    history.push(AppRoute.Player());

    render(
      <Provider store={userStore}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Loading Screen/i)).toBeInTheDocument();

    expect(screen.queryByText(/This page does not exist/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Go to main page/i)).not.toBeInTheDocument();
  });

  it('not found screen should render correctly', async () => {
    history.push(UNKNOWN_PATH);

    render(
      <Provider store={userStore}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This page does not exist/i)).toBeInTheDocument();
    expect(screen.queryByText(/Go to main page/i)).toBeInTheDocument();

    expect(screen.queryByText(/Loading Screen/i)).not.toBeInTheDocument();
  });
});

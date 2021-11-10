import { Provider } from 'react-redux';
import ReactRouter from 'react-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { fireEvent, render, screen } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { State } from '../../types/types';
import { AppRoute, AuthorizationStatus, FetchStatus } from '../../constants';
import { createMockFilm } from '../../mocks/films';
import PlayerScreen from './player-screen';
import { datatype } from 'faker';

const history = createMemoryHistory();

const mockDuration = datatype.number();
const mockFilm = createMockFilm();

const mockStore = configureMockStore<State>();

describe('Component: PlayerScreen', () => {
  beforeEach(() => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: String(mockFilm.id)});

    history.push(AppRoute.Player());

    window.HTMLVideoElement.prototype.pause = jest.fn();
    window.HTMLVideoElement.prototype.play = jest.fn();
    window.HTMLVideoElement.prototype.requestFullscreen = jest.fn();

    Object.defineProperty(window.HTMLMediaElement.prototype, 'duration', {
      get() {
        return mockDuration;
      },
    });

    Object.defineProperty(window.HTMLMediaElement.prototype, 'currentTime', {
      get() {
        return mockDuration;
      },
    });
  });

  it('should render correctly when current is fetched successfully', () => {
    const successStore = mockStore({
      films: {
        currentFilm: {
          data: mockFilm,
          status: FetchStatus.Succeeded,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      comments: {
        newComment: {
          status: FetchStatus.Idle,
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
          <Route path={AppRoute.Player()} exact>
            <PlayerScreen />
          </Route>
        </Router>
      </Provider>,
    );
    expect(screen.queryByText(/Exit/i)).toBeInTheDocument();
    expect(screen.queryByText(/Play/i)).toBeInTheDocument();
    expect(screen.queryByText(/Full screen/i)).toBeInTheDocument();
    expect(screen.queryByTestId('video-player')).toBeInTheDocument();

    expect(screen.queryByTestId('not-found-screen')).not.toBeInTheDocument();
    expect(screen.queryByText(/Loading Screen/i)).not.toBeInTheDocument();

    expect(successStore.dispatch).toHaveBeenCalledTimes(0);
    expect(window.HTMLVideoElement.prototype.pause).toHaveBeenCalledTimes(1);
    expect(window.HTMLVideoElement.prototype.play).toHaveBeenCalledTimes(0);
    expect(window.HTMLVideoElement.prototype.requestFullscreen).toHaveBeenCalledTimes(0);
  });

  it('should play video when data is loaded', () => {
    const successStore = mockStore({
      films: {
        currentFilm: {
          data: mockFilm,
          status: FetchStatus.Succeeded,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      comments: {
        newComment: {
          status: FetchStatus.Idle,
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
          <Route path={AppRoute.Player()} exact>
            <PlayerScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(window.HTMLVideoElement.prototype.pause).toHaveBeenCalledTimes(1);
    expect(window.HTMLVideoElement.prototype.play).toHaveBeenCalledTimes(0);

    fireEvent.loadedData(screen.getByTestId('video-player') as HTMLVideoElement);

    expect(window.HTMLVideoElement.prototype.pause).toHaveBeenCalledTimes(1);
    expect(window.HTMLVideoElement.prototype.play).toHaveBeenCalledTimes(1);
    expect(window.HTMLVideoElement.prototype.requestFullscreen).toHaveBeenCalledTimes(0);
  });

  it('should handle play button correctly', () => {
    const successStore = mockStore({
      films: {
        currentFilm: {
          data: mockFilm,
          status: FetchStatus.Succeeded,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      comments: {
        newComment: {
          status: FetchStatus.Idle,
        },
      },
    });

    successStore.dispatch = jest.fn();

    render(
      <Provider store={successStore}>
        <Router history={history}>
          <PlayerScreen />
        </Router>
      </Provider>,
    );

    expect(window.HTMLVideoElement.prototype.pause).toHaveBeenCalledTimes(1);
    expect(window.HTMLVideoElement.prototype.play).toHaveBeenCalledTimes(0);

    fireEvent.loadedData(screen.getByTestId('video-player') as HTMLVideoElement);

    expect(window.HTMLVideoElement.prototype.pause).toHaveBeenCalledTimes(1);
    expect(window.HTMLVideoElement.prototype.play).toHaveBeenCalledTimes(1);
    expect(window.HTMLVideoElement.prototype.requestFullscreen).toHaveBeenCalledTimes(0);

    fireEvent.click(screen.getByText(/Play/i));
    fireEvent.click(screen.getByText(/Play/i));

    expect(window.HTMLVideoElement.prototype.pause).toHaveBeenCalledTimes(2);
    expect(window.HTMLVideoElement.prototype.play).toHaveBeenCalledTimes(2);
    expect(window.HTMLVideoElement.prototype.requestFullscreen).toHaveBeenCalledTimes(0);
  });

  it('should handle fullscreen button correctly', () => {
    const successStore = mockStore({
      films: {
        currentFilm: {
          data: mockFilm,
          status: FetchStatus.Succeeded,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      comments: {
        newComment: {
          status: FetchStatus.Idle,
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
          <Route path={AppRoute.Player()} exact>
            <PlayerScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(window.HTMLVideoElement.prototype.pause).toHaveBeenCalledTimes(1);
    expect(window.HTMLVideoElement.prototype.play).toHaveBeenCalledTimes(0);

    fireEvent.loadedData(screen.getByTestId('video-player') as HTMLVideoElement);

    expect(window.HTMLVideoElement.prototype.pause).toHaveBeenCalledTimes(1);
    expect(window.HTMLVideoElement.prototype.play).toHaveBeenCalledTimes(1);
    expect(window.HTMLVideoElement.prototype.requestFullscreen).toHaveBeenCalledTimes(0);

    fireEvent.click(screen.getByText(/Full screen/i));

    expect(window.HTMLVideoElement.prototype.pause).toHaveBeenCalledTimes(1);
    expect(window.HTMLVideoElement.prototype.play).toHaveBeenCalledTimes(1);
    expect(window.HTMLVideoElement.prototype.requestFullscreen).toHaveBeenCalledTimes(1);
  });

  it('should redirect to film screen page', () => {
    const successStore = mockStore({
      films: {
        currentFilm: {
          data: mockFilm,
          status: FetchStatus.Succeeded,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      comments: {
        newComment: {
          status: FetchStatus.Idle,
        },
      },
    });

    successStore.dispatch = jest.fn();

    history.push(AppRoute.Player());

    render(
      <Provider store={successStore}>
        <Router history={history}>
          <Route path={AppRoute.Film()} exact>
            <div data-testid="film-screen" />
          </Route>
          <Route path={AppRoute.Player()} exact>
            <PlayerScreen />
          </Route>
        </Router>
      </Provider>,
    );

    fireEvent.click(screen.getByText(/Exit/i));

    expect(screen.queryByTestId('film-screen')).toBeInTheDocument();

    expect(screen.queryByText(/Exit/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Play/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Full screen/i)).not.toBeInTheDocument();

  });

  it('should show error screen when no valid id is present', () => {
    const successStore = mockStore({
      films: {
        currentFilm: {
          data: mockFilm,
          status: FetchStatus.Succeeded,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      comments: {
        newComment: {
          status: FetchStatus.Idle,
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
          <Route path={AppRoute.Player()} exact>
            <PlayerScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId('not-found-screen')).toBeInTheDocument();

    expect(screen.queryByText(/Loading Screen/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Exit/i)).not.toBeInTheDocument();

    expect(successStore.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should loading screen when no current film is present at the time', () => {
    const initialStore = mockStore({
      films: {
        currentFilm: {
          data: null,
          status: FetchStatus.Idle,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      comments: {
        newComment: {
          status: FetchStatus.Idle,
        },
      },
    });

    initialStore.dispatch = jest.fn();

    render(
      <Provider store={initialStore}>
        <Router history={history}>
          <PlayerScreen />
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Loading Screen/i)).toBeInTheDocument();

    expect(screen.queryByTestId('not-found-screen')).not.toBeInTheDocument();
    expect(screen.queryByText(/Exit/i)).not.toBeInTheDocument();

    expect(initialStore.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should dispatch load new current film', () => {
    const initialStore = mockStore({
      films: {
        currentFilm: {
          data: null,
          status: FetchStatus.Idle,
        },
      },
      authorization: {
        status: AuthorizationStatus.Auth,
      },
      comments: {
        newComment: {
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
          <Route path={AppRoute.Player()} exact>
            <PlayerScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Loading Screen/i)).toBeInTheDocument();

    expect(screen.queryByTestId('not-found-screen')).not.toBeInTheDocument();
    expect(screen.queryByText(/Exit/i)).not.toBeInTheDocument();

    expect(initialStore.dispatch).toHaveBeenCalledTimes(1);
  });
});

import { Provider } from 'react-redux';
import ReactRouter from 'react-router';
import { Route } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { State } from '../../types/types';
import { AppRoute, AuthorizationStatus, FetchStatus } from '../../constants';
import { createMockFilm } from '../../mocks/films';
import AddReviewScreen from './add-review-screen';

const history = createMemoryHistory();
const mockFilm = createMockFilm();
const mockStore = configureMockStore<State>();

describe('Component: AddReviewScreen', () => {
  beforeEach(() => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: String(mockFilm.id)});

    history.push(AppRoute.AddReview());
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
          <Route path={AppRoute.AddReview()} exact>
            <AddReviewScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId('not-found-screen')).not.toBeInTheDocument();
    expect(screen.queryByText(/WTW/i)).toBeInTheDocument();
    expect(successStore.dispatch).toHaveBeenCalledTimes(0);
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
          <Route path={AppRoute.AddReview()} exact>
            <AddReviewScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId('not-found-screen')).toBeInTheDocument();

    expect(screen.queryByText(/Loading Screen/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/WTW/i)).not.toBeInTheDocument();

    expect(successStore.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should show error when server responds with invalid data', () => {
    const invalidStore = mockStore({
      films: {
        currentFilm: {
          data: null,
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

    invalidStore.dispatch = jest.fn();

    render(
      <Provider store={invalidStore}>
        <Router history={history}>
          <Route path={AppRoute.NotFound()} exact>
            <div data-testid="not-found-screen" />
          </Route>
          <Route path={AppRoute.AddReview()} exact>
            <AddReviewScreen />
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
          <Route path={AppRoute.AddReview()} exact>
            <AddReviewScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Loading Screen/i)).toBeInTheDocument();

    expect(screen.queryByTestId('not-found-screen')).not.toBeInTheDocument();
    expect(screen.queryByText(/WTW/i)).not.toBeInTheDocument();

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
          <Route path={AppRoute.AddReview()} exact>
            <AddReviewScreen />
          </Route>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/Loading Screen/i)).toBeInTheDocument();

    expect(screen.queryByTestId('not-found-screen')).not.toBeInTheDocument();
    expect(screen.queryByText(/WTW/i)).not.toBeInTheDocument();

    expect(initialStore.dispatch).toHaveBeenCalledTimes(1);
  });
});

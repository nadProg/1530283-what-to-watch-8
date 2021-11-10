import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, CustomRouteType } from '../../constants';
import { State } from '../../types/types';
import CustomRoute from './custom-route';

const history = createMemoryHistory();
const mockStore = configureMockStore<State>();

const userStore = mockStore({
  authorization: {
    status: AuthorizationStatus.Auth,
  },
});

const guestStore = mockStore({
  authorization: {
    status: AuthorizationStatus.NotAuth,
  },
});

describe('Component: CustomRoute', () => {
  it('should show content for guests', () => {
    const mockGuestPath = '/mock-guest-path';

    history.push(mockGuestPath);

    render(
      <Provider store={guestStore}>
        <Router history={history}>
          <Route path={AppRoute.Root()} exact>
            <div data-testid="root-content" />
          </Route>
          <Route>
            <CustomRoute path={mockGuestPath} type={CustomRouteType.Guest}>
              <div data-testid="guest-content" />
            </CustomRoute>
          </Route>
        </Router>,
      </Provider>,
    );

    expect(screen.queryByTestId('root-content')).not.toBeInTheDocument();
    expect(screen.queryByTestId('guest-content')).toBeInTheDocument();
  });

  it('should redirect user to root page', () => {
    const mockGuestPath = '/mock-guest-path';

    history.push(mockGuestPath);


    render(
      <Provider store={userStore}>
        <Router history={history}>
          <Route path={AppRoute.Root()} exact>
            <div data-testid="root-content" />
          </Route>
          <Route>
            <CustomRoute path={mockGuestPath} type={CustomRouteType.Guest}>
              <div data-testid="guest-content" />
            </CustomRoute>
          </Route>
        </Router>,
      </Provider>,
    );

    expect(screen.queryByTestId('root-content')).toBeInTheDocument();
    expect(screen.queryByTestId('guest-content')).not.toBeInTheDocument();
  });

  it('should show private content for users', () => {
    const mockPrivatePath = '/mock-private-path';

    history.push(mockPrivatePath);

    render(
      <Provider store={userStore}>
        <Router history={history}>
          <Route path={AppRoute.Login()} exact>
            <div data-testid="login-content" />
          </Route>
          <Route>
            <CustomRoute path={mockPrivatePath} type={CustomRouteType.Private}>
              <div data-testid="private-content" />
            </CustomRoute>
          </Route>
        </Router>,
      </Provider>,
    );

    expect(screen.queryByTestId('login-content')).not.toBeInTheDocument();
    expect(screen.queryByTestId('private-content')).toBeInTheDocument();
  });

  it('should redirect guests to login page', () => {
    const mockPrivatePath = '/mock-private-path';

    history.push(mockPrivatePath);

    render(
      <Provider store={guestStore}>
        <Router history={history}>
          <Route path={AppRoute.Login()} exact>
            <div data-testid="login-content" />
          </Route>
          <Route>
            <CustomRoute path={mockPrivatePath} type={CustomRouteType.Private}>
              <div data-testid="private-content" />
            </CustomRoute>
          </Route>
        </Router>,
      </Provider>,
    );

    expect(screen.queryByTestId('login-content')).toBeInTheDocument();
    expect(screen.queryByTestId('private-content')).not.toBeInTheDocument();
  });
});

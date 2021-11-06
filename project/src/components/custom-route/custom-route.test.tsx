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
    const guestContent = 'Guest content';
    const rootContent = 'Root content';
    const mockGuestPath = '/mock-guest-path';

    history.push(mockGuestPath);

    render(
      <Provider store={guestStore}>
        <Router history={history}>
          <Route path={AppRoute.Root()} exact>
            <h2>{rootContent}</h2>
          </Route>
          <Route>
            <CustomRoute path={mockGuestPath} type={CustomRouteType.Guest}>
              <h2>{guestContent}</h2>
            </CustomRoute>
          </Route>
        </Router>,
      </Provider>,
    );

    expect(screen.queryByText(new RegExp(rootContent, 'i'))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(guestContent, 'i'))).toBeInTheDocument();
  });

  it('should redirect user to root page', () => {
    const guestContent = 'Guest content';
    const rootContent = 'Root content';
    const mockGuestPath = '/mock-guest-path';

    history.push(mockGuestPath);


    render(
      <Provider store={userStore}>
        <Router history={history}>
          <Route path={AppRoute.Root()} exact>
            <h2>{rootContent}</h2>
          </Route>
          <Route>
            <CustomRoute path={mockGuestPath} type={CustomRouteType.Guest}>
              <h2>{guestContent}</h2>
            </CustomRoute>
          </Route>
        </Router>,
      </Provider>,
    );

    expect(screen.queryByText(new RegExp(rootContent, 'i'))).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(guestContent, 'i'))).not.toBeInTheDocument();
  });

  it('should show private content for users', () => {
    const privateContent = 'Private content';
    const loginContent = 'Login content';
    const mockPrivatePath = '/mock-privtate-path';

    history.push(mockPrivatePath);

    render(
      <Provider store={userStore}>
        <Router history={history}>
          <Route path={AppRoute.Login()} exact>
            <h2>{loginContent}</h2>
          </Route>
          <Route>
            <CustomRoute path={mockPrivatePath} type={CustomRouteType.Private}>
              <h2>{privateContent}</h2>
            </CustomRoute>
          </Route>
        </Router>,
      </Provider>,
    );

    expect(screen.queryByText(new RegExp(loginContent, 'i'))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(privateContent, 'i'))).toBeInTheDocument();
  });

  it('should redirect guests to login page', () => {
    const privateContent = 'Private content';
    const loginContent = 'Login content';
    const mockPrivatePath = '/mock-privtate-path';

    history.push(mockPrivatePath);

    render(
      <Provider store={guestStore}>
        <Router history={history}>
          <Route path={AppRoute.Login()} exact>
            <h2>{loginContent}</h2>
          </Route>
          <Route>
            <CustomRoute path={mockPrivatePath} type={CustomRouteType.Private}>
              <h2>{privateContent}</h2>
            </CustomRoute>
          </Route>
        </Router>,
      </Provider>,
    );

    expect(screen.queryByText(new RegExp(loginContent, 'i'))).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(privateContent, 'i'))).not.toBeInTheDocument();
  });
});

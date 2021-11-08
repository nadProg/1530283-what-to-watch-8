import * as Redux from 'react-redux';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Route, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { State } from '../../types/types';
import { createMockAuthorizationInfo } from '../../mocks/authorization';
import UserBlock from './user-block';

const history = createMemoryHistory();

const mockStore = configureMockStore<State>();

const userStore = mockStore({
  authorization: {
    status: AuthorizationStatus.Auth,
    info: createMockAuthorizationInfo(),
  },
});

const guestStore = mockStore({
  authorization: {
    status: AuthorizationStatus.NotAuth,
  },
});

describe('Component: UserBlock', () => {
  it('should render correctly for signed in user', () => {
    render(
      <Provider store={userStore}>
        <Router history={history}>
          <UserBlock />
        </Router>,
      </Provider>,
    );

    expect(screen.queryByText(/Sign Out/i)).toBeInTheDocument();
    expect(screen.getByAltText(/User avatar/i)).toBeInTheDocument();

    expect(screen.queryByText(/Sign In/i)).not.toBeInTheDocument();
  });

  it('should handle logout action signed in user', () => {
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);

    render(
      <Provider store={userStore}>
        <Router history={history}>
          <UserBlock />
        </Router>,
      </Provider>,
    );

    expect(useDispatch).toBeCalledTimes(1);

    userEvent.click(screen.getByText(/Sign Out/i));

    expect(dispatch).toBeCalledTimes(1);
  });

  it('should handle redirect to my-list page for signed in user', () => {
    render(
      <Provider store={userStore}>
        <Router history={history}>
          <Route path={AppRoute.MyList()} exact>
            <div data-testid="my-list-page" />
          </Route>
          <Route>
            <UserBlock />
          </Route>
        </Router>,
      </Provider>,
    );

    userEvent.click(screen.getByAltText(/User avatar/i));

    expect(screen.queryByTestId('my-list-page')).toBeInTheDocument();
  });

  it('should render correctly for guest', () => {
    render(
      <Provider store={guestStore}>
        <Router history={history}>
          <UserBlock />
        </Router>,
      </Provider>,
    );

    expect(screen.queryByText(/Sign In/i)).toBeInTheDocument();

    expect(screen.queryByText(/Sign Out/i)).not.toBeInTheDocument();
  });

  it('should handle redirect to login page for guest user', () => {
    render(
      <Provider store={guestStore}>
        <Router history={history}>
          <Route path={AppRoute.Login()} exact>
            <div data-testid="login-page" />
          </Route>
          <Route>
            <UserBlock />
          </Route>
        </Router>,
      </Provider>,
    );

    userEvent.click(screen.getByText(/Sign In/i));

    expect(screen.queryByTestId('login-page')).toBeInTheDocument();
  });
});

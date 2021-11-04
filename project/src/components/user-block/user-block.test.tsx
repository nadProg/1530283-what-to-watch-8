import * as Redux from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../constants';
import { createMockAuthorizationInfo } from '../../mocks/authorization';
import { State } from '../../types/types';
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

    expect(screen.queryByText(/Sign In/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Sign Out/i)).toBeInTheDocument();
    expect(screen.getByAltText(/User avatar/i)).toBeInTheDocument();
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
    const myListContent = 'My List';

    render(
      <Provider store={userStore}>
        <Router history={history}>
          <Route path={AppRoute.MyList()} exact>
            <h2>{myListContent}</h2>
          </Route>
          <Route>
            <UserBlock />
          </Route>
        </Router>,
      </Provider>,
    );

    userEvent.click(screen.getByAltText(/User avatar/i));
    expect(screen.queryByText(new RegExp(myListContent, 'i'))).toBeInTheDocument();
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
    const loginContent = 'Login page';

    render(
      <Provider store={guestStore}>
        <Router history={history}>
          <Route path={AppRoute.Login()} exact>
            <h2>{loginContent}</h2>
          </Route>
          <Route>
            <UserBlock />
          </Route>
        </Router>,
      </Provider>,
    );

    userEvent.click(screen.getByText(/Sign In/i));
    expect(screen.queryByText(new RegExp(loginContent, 'i'))).toBeInTheDocument();
  });
});

import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AuthorizationStatus } from '../../constants';
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
});

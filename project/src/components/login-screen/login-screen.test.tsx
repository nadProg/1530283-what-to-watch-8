import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { State } from '../../types/types';
import LoginScreen from './login-screen';

const history = createMemoryHistory();

const mockStore = configureMockStore<State>();

const store = mockStore({
  authorization: {
    errorMessage: '',
  },
});

describe('Component: LoginScreen', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginScreen />
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId('login-form')).toBeInTheDocument();
  });
});

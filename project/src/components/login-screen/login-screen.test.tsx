import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
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
    const { container } = render(
      <Provider store={store}>
        <Router history={history}>
          <LoginScreen />
        </Router>
      </Provider>,
    );

    expect(container.querySelector('form')).not.toBeNull();
  });
});

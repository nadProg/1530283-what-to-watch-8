import { configureMockStore } from '@jedmao/redux-mock-store';
import { render } from '@testing-library/react';
import { lorem } from 'faker';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { State } from '../../types/types';
import LoginForm from './login-form';

const history = createMemoryHistory();

const mockClassName = lorem.word();

const mockStore = configureMockStore<State>();

describe('Component: FilmCardButtons', () => {
  it('should render correctly', () => {
    const store = mockStore({
      authorization: {
        errorMessage: '',
      },
    });

    const { container} = render(
      <Provider store={store}>
        <Router history={history}>
          <LoginForm />
        </Router>,
      </Provider>,
    );

    expect(container.querySelector('form')).toBeTruthy();
    expect(container.querySelector('.sign-in__message')).not.toBeTruthy();
  });

  it('should render correctly with className props', () => {
    const store = mockStore({
      authorization: {
        errorMessage: '',
      },
    });

    const { container} = render(
      <Provider store={store}>
        <Router history={history}>
          <LoginForm className={mockClassName} />
        </Router>,
      </Provider>,
    );

    expect(container.querySelector('form')).toBeTruthy();
    expect(container.querySelector(`.${mockClassName}`)).toBeTruthy();
    expect(container.querySelector('.sign-in__message')).not.toBeTruthy();
  });

  it('should render correctly with errorMessage in store', () => {
    const store = mockStore({
      authorization: {
        errorMessage: lorem.words(),
      },
    });

    const { container} = render(
      <Provider store={store}>
        <Router history={history}>
          <LoginForm />
        </Router>,
      </Provider>,
    );

    expect(container.querySelector('form')).toBeTruthy();
    expect(container.querySelector('.sign-in__message')).toBeTruthy();
  });
});

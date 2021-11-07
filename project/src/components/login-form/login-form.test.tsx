import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { internet, lorem } from 'faker';
import { clearAuthorizationErrorMessage } from '../../store/authorization/authorization-actions';
import { State } from '../../types/types';
import LoginForm from './login-form';

const history = createMemoryHistory();
const mockClassName = lorem.word();
const mockStore = configureMockStore<State>();

describe('Component: LoginForm', () => {
  it('should render correctly', () => {
    const store = mockStore({
      authorization: {
        errorMessage: '',
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginForm />
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId('login-form')).toBeInTheDocument();
    expect(screen.queryByTestId('email-input')).toBeInTheDocument();
    expect(screen.queryByTestId('password-input')).toBeInTheDocument();

    expect(screen.queryByTestId('validity-message')).not.toBeInTheDocument();
    expect(screen.queryByTestId('server-message')).not.toBeInTheDocument();
  });

  it('should render correctly with className props', () => {
    const store = mockStore({
      authorization: {
        errorMessage: '',
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginForm className={mockClassName} />
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId('login-form-container')).toHaveClass(mockClassName);
  });

  it('should render correctly with errorMessage in store', () => {
    const store = mockStore({
      authorization: {
        errorMessage: lorem.words(),
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginForm />
        </Router>
      </Provider>,
    );

    expect(screen.queryByTestId('validity-message')).not.toBeInTheDocument();

    expect(screen.queryByTestId('server-message')).toBeInTheDocument();
  });

  it('should handle submit action when valid data is provided', () => {
    const validMockPassword = 'abc1';
    const validMockEmail = internet.email();

    const store = mockStore({
      authorization: {
        errorMessage: '',
      },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginForm />
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('email-input'), validMockEmail);
    userEvent.type(screen.getByTestId('password-input'), validMockPassword);

    expect(screen.getByDisplayValue(validMockEmail)).toBeInTheDocument();
    expect(screen.getByDisplayValue(validMockPassword)).toBeInTheDocument();

    userEvent.click(screen.getByTestId('submit-button'));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).not.toHaveBeenCalledWith(clearAuthorizationErrorMessage());
  });

  it('should prevent submit action when invalid email is provided', () => {
    const validMockPassword = 'abc1';
    const invalidMockEmail = 'invalid@com';

    const store = mockStore({
      authorization: {
        errorMessage: '',
      },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginForm />
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('email-input'), invalidMockEmail);
    userEvent.type(screen.getByTestId('password-input'), validMockPassword);

    expect(screen.getByDisplayValue(invalidMockEmail)).toBeInTheDocument();
    expect(screen.getByDisplayValue(validMockPassword)).toBeInTheDocument();

    userEvent.click(screen.getByTestId('submit-button'));

    expect(screen.queryByTestId('validity-message')).toBeInTheDocument();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(clearAuthorizationErrorMessage());
  });

  it('should prevent submit action when invalid password is provided', () => {
    const invalidMockPassword = 'a';
    const validMockEmail = internet.email();

    const store = mockStore({
      authorization: {
        errorMessage: '',
      },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginForm />
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('email-input'), validMockEmail);
    userEvent.type(screen.getByTestId('password-input'), invalidMockPassword);

    expect(screen.getByDisplayValue(validMockEmail)).toBeInTheDocument();
    expect(screen.getByDisplayValue(invalidMockPassword)).toBeInTheDocument();

    userEvent.click(screen.getByTestId('submit-button'));

    expect(screen.queryByTestId('validity-message')).toBeInTheDocument();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(clearAuthorizationErrorMessage());
  });

  it('should prevent submit action when invalid no password is provided', () => {
    const validMockEmail = internet.email();

    const store = mockStore({
      authorization: {
        errorMessage: '',
      },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginForm />
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('email-input'), validMockEmail);
    expect(screen.getByDisplayValue(validMockEmail)).toBeInTheDocument();

    userEvent.click(screen.getByTestId('submit-button'));

    expect(screen.queryByTestId('validity-message')).toBeInTheDocument();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(clearAuthorizationErrorMessage());
  });

  it('should prevent submit action when no email is provided', () => {
    const validMockPassword = 'abc';

    const store = mockStore({
      authorization: {
        errorMessage: '',
      },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginForm />
        </Router>
      </Provider>,
    );

    userEvent.type(screen.getByTestId('password-input'), validMockPassword);

    expect(screen.getByDisplayValue(validMockPassword)).toBeInTheDocument();

    userEvent.click(screen.getByTestId('submit-button'));

    expect(screen.queryByTestId('validity-message')).toBeInTheDocument();

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(clearAuthorizationErrorMessage());
  });

  it('should prevent submit action when no data is provided', () => {
    const store = mockStore({
      authorization: {
        errorMessage: '',
      },
    });

    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginForm />
        </Router>
      </Provider>,
    );

    userEvent.click(screen.getByTestId('submit-button'));

    expect(screen.queryByTestId('validity-message')).toBeInTheDocument();

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(clearAuthorizationErrorMessage());
  });
});

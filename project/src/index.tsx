import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Toaster } from 'react-hot-toast';
import { AuthorizationStatus } from './constants';
import App from './components/app/app';
import { setAuthorizationStatus } from './store/authorization/authorization-actions';
import { rootReducer } from './store/root-reducer';
import { redirect } from './store/middleware/redirect';
import { createAPI } from './services/api';
import { getLogin } from './store/authorization/authorization-api-actions';

const api = createAPI(() => {
  store.dispatch(setAuthorizationStatus(AuthorizationStatus.NotAuth));
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});

store.dispatch(getLogin());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster position="top-right" />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));

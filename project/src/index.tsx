import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Toaster } from 'react-hot-toast';
import App from './components/app/app';
import { setAuthorizationStatus } from './store/authorization/authorization-actions';
import { rootReducer } from './store/root-reducer';
import { AuthorizationStatus } from './constants';
import { createAPI } from './services/api';
import { redirect } from './store/middleware/redirect';

const api = createAPI(() => {
  store.dispatch(setAuthorizationStatus(AuthorizationStatus.NotAuth));
});

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument(api)),
    applyMiddleware(redirect),
  ),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Toaster position="top-right" />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));

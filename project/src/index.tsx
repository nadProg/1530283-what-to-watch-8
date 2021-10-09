import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

import { promoFilm } from './mocks/films';

ReactDOM.render(
  <React.StrictMode>
    <App films={[promoFilm]}/>
  </React.StrictMode>,
  document.getElementById('root'));

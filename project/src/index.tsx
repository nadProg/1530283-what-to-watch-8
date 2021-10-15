import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';

import { films } from './mocks/films';
import { comments } from './mocks/comments';

ReactDOM.render(
  <React.StrictMode>
    <App films={films} comments={comments} />
  </React.StrictMode>,
  document.getElementById('root'));

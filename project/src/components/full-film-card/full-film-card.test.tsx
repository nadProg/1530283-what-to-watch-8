import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../constants';
import { State } from '../../types/types';
import { createMockComments } from '../../mocks/comments';
import { createMockFilm } from '../../mocks/films';
import FullFilmCard from './full-film-card';

const history = createMemoryHistory();

const mockFilm = createMockFilm();
const mockComments = createMockComments();

const mockStore = configureMockStore<State>();

const store = mockStore({
  authorization: {
    status: AuthorizationStatus.Auth,
  },
});

describe('Component: FullFilmCard', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <FullFilmCard film={mockFilm} comments={mockComments} />
        </Router>,
      </Provider>,
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });
});

import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AuthorizationStatus } from '../../constants';
import { createMockComments } from '../../mocks/comments';
import { createMockFilm } from '../../mocks/films';
import { State } from '../../types/types';
import FullFilmCard from './full-film-card';

const history = createMemoryHistory();

const mockStore = configureMockStore<State>();

const store = mockStore({
  authorization: {
    status: AuthorizationStatus.Auth,
  },
});


const mockFilm = createMockFilm();
const mockComments = createMockComments();

describe('Component: FullFilmCard', () => {
  it('should render correctly with no props', () => {
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

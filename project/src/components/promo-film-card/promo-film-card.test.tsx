import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AuthorizationStatus } from '../../constants';
import { createMockFilm } from '../../mocks/films';
import { State } from '../../types/types';
import PromoFilmCard from './promo-film-card';

const history = createMemoryHistory();

const mockStore = configureMockStore<State>();

const store = mockStore({
  authorization: {
    status: AuthorizationStatus.Auth,
  },
});

const mockFilm = createMockFilm();

describe('Component: PromoFilmCard', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <PromoFilmCard film={mockFilm} />
        </Router>,
      </Provider>,
    );

    expect(screen.queryByText(/WTW/i)).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(mockFilm.name, 'i'))).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(mockFilm.genre, 'i'))).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(String(mockFilm.released), 'i'))).toBeInTheDocument();
  });
});

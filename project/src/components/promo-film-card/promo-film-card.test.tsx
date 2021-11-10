import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../constants';
import { State } from '../../types/types';
import { createMockFilm } from '../../mocks/films';
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

    expect(screen.queryByTestId('film-card-title')).toHaveTextContent(mockFilm.name);
    expect(screen.queryByTestId('film-card-genre')).toHaveTextContent(mockFilm.genre);
    expect(screen.queryByTestId('film-card-year')).toHaveTextContent(String(mockFilm.released));
  });
});

import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { AuthorizationStatus } from '../../constants';
import { createMockFilm } from '../../mocks/films';
import { State } from '../../types/types';
import FilmCardHero from './film-card-hero';

const history = createMemoryHistory();
const mockFilm = createMockFilm();

const mockStore = configureMockStore<State>();

const store = mockStore({
  authorization: {
    status: AuthorizationStatus.Auth,
  },
});

describe('Component: FilmCardHero', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <FilmCardHero film={mockFilm} />
        </Router>
      </Provider>,
    );

    expect(screen.getByAltText(mockFilm.name)).toHaveAttribute('src', mockFilm.backgroundImage);

    expect(screen.queryByTestId('film-card-title')).toHaveTextContent(mockFilm.name);
    expect(screen.queryByTestId('film-card-genre')).toHaveTextContent(mockFilm.genre);
    expect(screen.queryByTestId('film-card-year')).toHaveTextContent(String(mockFilm.released));
  });
});

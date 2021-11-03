import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import CatalogFilmsList from './catalog-films-list';
import { createMockFilms } from '../../mocks/films';

const history = createMemoryHistory();

const mockFilms = createMockFilms();

describe('Component: Catalog', () => {
  it('should render correctly with', () => {
    const { container } = render(
      <Router history={history}>
        <CatalogFilmsList films={mockFilms} />
      </Router>,
    );

    expect(container.querySelectorAll('.catalog__films-card').length).toBe(mockFilms.length);
  });
});

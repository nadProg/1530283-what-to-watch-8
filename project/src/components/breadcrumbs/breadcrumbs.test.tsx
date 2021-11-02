import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createMockFilm } from '../../mocks/films';
import Breadcrumbs from './breadcrumbs';

const history = createMemoryHistory();

const mockFilm = createMockFilm();

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Breadcrumbs film={mockFilm} />
      </Router>,
    );

    expect(screen.queryByText(new RegExp(mockFilm.name, 'i'))).toBeInTheDocument();
  });
});

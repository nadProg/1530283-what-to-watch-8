import { render, screen } from '@testing-library/react';
import { lorem } from 'faker';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createMockFilm } from '../../mocks/films';
import SmallFilmCard from './small-film-card';

const history = createMemoryHistory();

const mockFilm = createMockFilm();
const mockClassName = lorem.word();

describe('Component: SmallFilmCard', () => {
  it('should render correctly', () => {
    const { container } = render(
      <Router history={history}>
        <SmallFilmCard film={mockFilm} />
      </Router>,
    );

    expect(container.querySelector('article')).toBeTruthy();
    expect(screen.queryByText(new RegExp(mockFilm.name, 'i'))).toBeInTheDocument();
    expect(screen.getByAltText(new RegExp(mockFilm.name, 'i'))).toBeInTheDocument();
  });

  it('should render correctly with className props', () => {
    const { container } = render(
      <Router history={history}>
        <SmallFilmCard film={mockFilm} className={mockClassName} />
      </Router>,
    );

    expect(container.querySelector(`article.${mockClassName}`)).toBeTruthy();

    expect(container.querySelector('article')).toBeTruthy();
    expect(screen.queryByText(new RegExp(mockFilm.name, 'i'))).toBeInTheDocument();
    expect(screen.getByAltText(new RegExp(mockFilm.name, 'i'))).toBeInTheDocument();
  });
});

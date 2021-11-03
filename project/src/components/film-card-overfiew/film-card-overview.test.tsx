import { render, screen } from '@testing-library/react';
import { createMockFilm } from '../../mocks/films';
import { formatRating } from '../../utils/films';
import FilmCardOverview from './film-card-overview';

const MAX_OVERVIEW_ACTORS_COUNT = 4;

const mockFilm = createMockFilm();

describe('Component: FilmCardOverview', () => {
  it('should render correctly', () => {
    render(
      <FilmCardOverview film={mockFilm} />,
    );

    expect(screen.queryByText(/Director/i)).toBeInTheDocument();
    expect(screen.queryByText(/Starring/i)).toBeInTheDocument();

    expect(screen.queryByText(new RegExp(mockFilm.director, 'i'))).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(mockFilm.description, 'i'))).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(String(mockFilm.scoresCount), 'i'))).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(formatRating(mockFilm.rating), 'i'))).toBeInTheDocument();

    mockFilm.actors.slice(0, MAX_OVERVIEW_ACTORS_COUNT).forEach((actor) => {
      expect(screen.queryByText(new RegExp(actor, 'i'))).toBeInTheDocument();
    });
  });
});

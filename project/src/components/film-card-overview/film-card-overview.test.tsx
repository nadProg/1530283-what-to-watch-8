import { render, screen } from '@testing-library/react';
import { MAX_OVERVIEW_ACTORS_COUNT } from '../../constants';
import { createMockFilm } from '../../mocks/films';
import { formatRating } from '../../utils/films';
import FilmCardOverview from './film-card-overview';

const mockFilm = createMockFilm();

describe('Component: FilmCardOverview', () => {
  it('should render correctly', () => {
    render(
      <FilmCardOverview film={mockFilm} />,
    );

    expect(screen.queryByText(/Director/i)).toBeInTheDocument();
    expect(screen.queryByText(/Starring/i)).toBeInTheDocument();

    expect(screen.queryByTestId('film-overview-director')).toHaveTextContent(mockFilm.director);
    expect(screen.queryByTestId('film-overview-description')).toHaveTextContent(mockFilm.description);
    expect(screen.queryByTestId('film-overview-scores-count')).toHaveTextContent(String(mockFilm.scoresCount));
    expect(screen.queryByTestId('film-overview-rating')).toHaveTextContent(formatRating(mockFilm.rating));

    mockFilm.actors.slice(0, MAX_OVERVIEW_ACTORS_COUNT).forEach((actor) => {
      expect(screen.queryByTestId('film-overview-actors')).toHaveTextContent(actor);
    });
  });
});

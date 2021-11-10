import { render, screen } from '@testing-library/react';
import { createMockFilm } from '../../mocks/films';
import { formatRuntime } from '../../utils/date';
import FilmCardDetails from './film-card-details';

const mockFilm = createMockFilm();

describe('Component: FilmCardDetails', () => {
  it('should render correctly', () => {
    render(
      <FilmCardDetails film={mockFilm} />,
    );

    expect(screen.queryByText(/Director/i)).toBeInTheDocument();
    expect(screen.queryByText(/Starring/i)).toBeInTheDocument();
    expect(screen.queryByText(/Run Time/i)).toBeInTheDocument();
    expect(screen.queryByText(/Genre/i)).toBeInTheDocument();
    expect(screen.queryByText(/Released/i)).toBeInTheDocument();

    expect(screen.queryByTestId('film-card-genre')).toHaveTextContent(mockFilm.genre);
    expect(screen.queryByTestId('film-card-director')).toHaveTextContent(mockFilm.director);
    expect(screen.queryByTestId('film-card-year')).toHaveTextContent(String(mockFilm.released));
    expect(screen.queryByTestId('film-card-run-time')).toHaveTextContent(formatRuntime(mockFilm.runTime));

    mockFilm.actors.forEach((actor) => {
      expect(screen.queryByText(new RegExp(actor, 'i'))).toBeInTheDocument();
    });
  });
});

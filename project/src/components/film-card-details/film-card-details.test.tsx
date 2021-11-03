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

    expect(screen.queryByText(new RegExp(mockFilm.genre, 'i'))).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(mockFilm.director, 'i'))).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(String(mockFilm.released), 'i'))).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(formatRuntime(mockFilm.runTime), 'i'))).toBeInTheDocument();

    mockFilm.actors.forEach((actor) => {
      expect(screen.queryByText(new RegExp(actor, 'i'))).toBeInTheDocument();
    });
  });
});

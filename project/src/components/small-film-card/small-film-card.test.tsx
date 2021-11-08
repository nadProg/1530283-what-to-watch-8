import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act } from '@testing-library/react-hooks';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { lorem } from 'faker';
import { asyncDelay } from '../../utils/common';
import { createMockFilm } from '../../mocks/films';
import SmallFilmCard from './small-film-card';

const history = createMemoryHistory();

const mockFilm = createMockFilm();
const mockClassName = lorem.word();

describe('Component: SmallFilmCard', () => {
  beforeEach(() => {
    Object.defineProperty(window.HTMLMediaElement.prototype, 'muted', {
      get: () => false,
      set: jest.fn(),
    });
  });

  it('should render correctly', () => {
    render(
      <Router history={history}>
        <SmallFilmCard film={mockFilm} />
      </Router>,
    );
    expect(screen.getByAltText(mockFilm.name)).toHaveAttribute('src', mockFilm.previewImage);

    expect(screen.queryByTestId('small-film-card')).toBeInTheDocument();
    expect(screen.queryByTestId('small-film-card-image-preview')).toBeInTheDocument();
    expect(screen.queryByTestId('small-card-title')).toHaveTextContent(mockFilm.name);

    expect(screen.queryByTestId('small-film-card-video-preview')).not.toBeInTheDocument();
  });

  it('should render correctly with className props', () => {
    render(
      <Router history={history}>
        <SmallFilmCard film={mockFilm} className={mockClassName} />
      </Router>,
    );

    expect(screen.getByAltText(mockFilm.name)).toHaveAttribute('src', mockFilm.previewImage);

    expect(screen.queryByTestId('small-film-card')).toHaveClass(mockClassName);

    expect(screen.queryByTestId('small-film-card')).toBeInTheDocument();
    expect(screen.queryByTestId('small-film-card-image-preview')).toBeInTheDocument();
    expect(screen.queryByTestId('small-card-title')).toHaveTextContent(mockFilm.name);

    expect(screen.queryByTestId('small-film-card-video-preview')).not.toBeInTheDocument();
  });

  it('should render video on mouseover', async () => {
    const TIME_TO_SHOW_VIDEO = 2000;
    const TIME_NOT_TO_SHOW_VIDEO = 500;

    render(
      <Router history={history}>
        <SmallFilmCard film={mockFilm} className={mockClassName} />
      </Router>,
    );

    await act(async () => {
      userEvent.hover(screen.getByTestId('small-film-card'));
      await asyncDelay(TIME_TO_SHOW_VIDEO);
    });

    expect(screen.queryByTestId('small-film-card-video-preview')).toBeInTheDocument();
    expect(screen.queryByTestId('small-film-card-image-preview')).not.toBeInTheDocument();

    act(() => {
      userEvent.unhover(screen.getByTestId('small-film-card'));
    });

    expect(screen.queryByTestId('small-film-card-image-preview')).toBeInTheDocument();
    expect(screen.queryByTestId('small-film-card-video-preview')).not.toBeInTheDocument();

    await act(async () => {
      await asyncDelay(TIME_NOT_TO_SHOW_VIDEO);
      userEvent.unhover(screen.getByTestId('small-film-card'));
      userEvent.hover(screen.getByTestId('small-film-card'));
      await asyncDelay(TIME_NOT_TO_SHOW_VIDEO);
    });

    expect(screen.queryByTestId('small-film-card-image-preview')).toBeInTheDocument();
    expect(screen.queryByTestId('small-film-card-video-preview')).not.toBeInTheDocument();

    act(() => {
      userEvent.unhover(screen.getByTestId('small-film-card'));
    });

    expect(screen.queryByTestId('small-film-card-image-preview')).toBeInTheDocument();
    expect(screen.queryByTestId('small-film-card-video-preview')).not.toBeInTheDocument();
  });
});

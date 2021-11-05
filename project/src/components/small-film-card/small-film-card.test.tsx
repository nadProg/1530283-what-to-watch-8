import { act } from '@testing-library/react-hooks';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { lorem } from 'faker';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { createMockFilm } from '../../mocks/films';
import { asyncDelay } from '../../utils/common';
import SmallFilmCard from './small-film-card';

const history = createMemoryHistory();

const mockFilm = createMockFilm();
const mockClassName = lorem.word();

describe('Component: SmallFilmCard', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <SmallFilmCard film={mockFilm} />
      </Router>,
    );

    expect(screen.queryByTestId('card')).toBeInTheDocument();
    expect(screen.queryByTestId('card-image-preview')).toBeInTheDocument();
    expect(screen.queryByTestId('card-video-preview')).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(mockFilm.name, 'i'))).toBeInTheDocument();
    expect(screen.getByAltText(new RegExp(mockFilm.name, 'i'))).toBeInTheDocument();
  });

  it('should render correctly with className props', () => {
    render(
      <Router history={history}>
        <SmallFilmCard film={mockFilm} className={mockClassName} />
      </Router>,
    );


    expect(screen.queryByTestId('card')).toBeInTheDocument();
    expect(screen.queryByTestId('card')).toHaveClass(mockClassName);
    expect(screen.queryByTestId('card-image-preview')).toBeInTheDocument();
    expect(screen.queryByTestId('card-video-preview')).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(mockFilm.name, 'i'))).toBeInTheDocument();
    expect(screen.getByAltText(new RegExp(mockFilm.name, 'i'))).toBeInTheDocument();
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
      userEvent.hover(screen.getByTestId('card'));
      await asyncDelay(TIME_TO_SHOW_VIDEO);
    });

    expect(screen.queryByTestId('card-video-preview')).toBeInTheDocument();
    expect(screen.queryByTestId('card-image-preview')).not.toBeInTheDocument();

    act(() => {
      userEvent.unhover(screen.getByTestId('card'));
    });

    expect(screen.queryByTestId('card-video-preview')).not.toBeInTheDocument();
    expect(screen.queryByTestId('card-image-preview')).toBeInTheDocument();

    await act(async () => {
      await asyncDelay(TIME_NOT_TO_SHOW_VIDEO);
      userEvent.unhover(screen.getByTestId('card'));
      userEvent.hover(screen.getByTestId('card'));
      await asyncDelay(TIME_NOT_TO_SHOW_VIDEO);
    });

    expect(screen.queryByTestId('card-video-preview')).not.toBeInTheDocument();
    expect(screen.queryByTestId('card-image-preview')).toBeInTheDocument();

    act(() => {
      userEvent.unhover(screen.getByTestId('card'));
    });

    expect(screen.queryByTestId('card-video-preview')).not.toBeInTheDocument();
    expect(screen.queryByTestId('card-image-preview')).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import { internet } from 'faker';
import SmallFilmCardVideo from './small-film-card-video';

const mockSource = internet.url();
const mockPoster = internet.url();

describe('Component: SmallFilmCardVideo', () => {
  beforeEach(() => {
    Object.defineProperty(HTMLMediaElement.prototype, 'muted', {
      get: () => false,
      set: jest.fn(),
    });
  });

  it('should render correctly', () => {
    render(
      <SmallFilmCardVideo src={mockSource} poster={mockPoster} />,
    );

    expect(screen.queryByTestId('small-film-card-video-preview')).toHaveAttribute('src', mockSource);
    expect(screen.queryByTestId('small-film-card-video-preview')).toHaveAttribute('poster', mockPoster);
  });

  it('should render correctly without poster', () => {
    render(
      <SmallFilmCardVideo src={mockSource} />,
    );

    expect(screen.queryByTestId('small-film-card-video-preview')).toHaveAttribute('src', mockSource);
    expect(screen.queryByTestId('small-film-card-video-preview')).not.toHaveAttribute('poster');
  });
});

import { render } from '@testing-library/react';
import { internet } from 'faker';
import SmallFilmCardVideo from './small-film-card-video';

const mockSource = internet.url();
const mockPoster = internet.url();

describe('Component: SmallFilmCardVideo', () => {
  it('should render correctly', () => {
    const { container } = render(
      <SmallFilmCardVideo src={mockSource} poster={mockPoster} />,
    );

    expect(container.querySelector('video')).toBeTruthy();
  });

  it('should render correctly without poster', () => {
    const { container } = render(
      <SmallFilmCardVideo src={mockSource} />,
    );

    expect(container.querySelector('video')).toBeTruthy();
  });
});

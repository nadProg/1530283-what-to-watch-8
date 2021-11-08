import { render, screen } from '@testing-library/react';
import { internet, lorem } from 'faker';
import SmallFilmCardPreview from './small-film-card-preview';

const mockSource = internet.url();
const mockAltText = lorem.words();

describe('Component: SmallFilmCardPreview', () => {
  it('should render correctly', () => {
    render(
      <SmallFilmCardPreview src={mockSource} alt={mockAltText} />,
    );

    expect(screen.getByAltText(mockAltText)).toHaveAttribute('src', mockSource);
  });

  it('should render correctly without alt', () => {
    render(
      <SmallFilmCardPreview src={mockSource} />,
    );

    expect(screen.getByAltText('')).toHaveAttribute('src', mockSource);
  });
});

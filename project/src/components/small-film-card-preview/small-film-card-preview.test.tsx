import { render, screen } from '@testing-library/react';
import { internet, lorem } from 'faker';
import SmallFilmCardPreview from './small-film-card-preview';

const mockSource = internet.url();
const mockAlt = lorem.words();

describe('Component: SmallFilmCardPreview', () => {
  it('should render correctly', () => {
    render(
      <SmallFilmCardPreview src={mockSource} alt={mockAlt} />,
    );

    expect(screen.getByAltText(new RegExp(mockAlt, 'i'))).toBeInTheDocument();
    expect(screen.getByAltText(new RegExp(mockAlt, 'i'))).toHaveAttribute('src', mockSource);
  });

  it('should render correctly without alt', () => {
    render(
      <SmallFilmCardPreview src={mockSource} />,
    );

    expect(screen.getByAltText('')).toBeInTheDocument();
    expect(screen.getByAltText('')).toHaveAttribute('src', mockSource);
  });
});

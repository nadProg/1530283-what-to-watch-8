import { render, screen } from '@testing-library/react';
import { internet, lorem } from 'faker';
import FilmCardBackground from './film-card-background';

const mockSource = internet.url();
const mockAltText = lorem.word();

describe('Component: FilmCardBackground', () => {
  it('should render correctly', () => {
    render(
      <FilmCardBackground src={mockSource} alt={mockAltText} />,
    );

    expect(screen.getByAltText(new RegExp(mockAltText, 'i'))).toBeInTheDocument();
  });
});

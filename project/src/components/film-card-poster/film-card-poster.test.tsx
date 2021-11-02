import { render, screen } from '@testing-library/react';
import { internet, lorem } from 'faker';
import FilmCardPoster from './film-card-poster';

const mockSource = internet.url();
const mockAltText = lorem.word();

describe('Component: FilmCardPoster', () => {
  it('should render correctly with no props', () => {
    const { container } =render(
      <FilmCardPoster src={mockSource} alt={mockAltText} />,
    );

    expect(screen.getByAltText(new RegExp(mockAltText, 'i'))).toBeInTheDocument();

    expect(container.querySelector('.film-card__poster--big')).toBeFalsy();
    expect(container.querySelector('.film-card__poster--small')).toBeFalsy();
  });

  it('should render correctly with small props', () => {
    const { container } = render(
      <FilmCardPoster src={mockSource} alt={mockAltText} small />,
    );

    expect(screen.getByAltText(new RegExp(mockAltText, 'i'))).toBeInTheDocument();

    expect(container.querySelector('.film-card__poster--big')).toBeFalsy();
    expect(container.querySelector('.film-card__poster--small')).toBeTruthy();
  });

  it('should render correctly with big props', () => {
    const { container } = render(
      <FilmCardPoster src={mockSource} alt={mockAltText} big />,
    );

    expect(screen.getByAltText(new RegExp(mockAltText, 'i'))).toBeInTheDocument();

    expect(container.querySelector('.film-card__poster--big')).toBeTruthy();
    expect(container.querySelector('.film-card__poster--small')).toBeFalsy();
  });

  it('should render correctly with small and big props', () => {
    const { container } = render(
      <FilmCardPoster src={mockSource} alt={mockAltText} small big />,
    );

    expect(screen.getByAltText(new RegExp(mockAltText, 'i'))).toBeInTheDocument();

    expect(container.querySelector('.film-card__poster--big')).toBeTruthy();
    expect(container.querySelector('.film-card__poster--small')).toBeTruthy();
  });
});

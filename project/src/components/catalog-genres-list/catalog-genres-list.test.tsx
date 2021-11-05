import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { lorem } from 'faker';
import { ALL_GENRES } from '../../constants';
import CatalogGenresList from './catalog-genres-list';

const mockGenres = [ALL_GENRES, ...lorem.words().split(' ')];
const activeGenre = mockGenres[0];
const setActiveGenre = jest.fn();

describe('Component: CatalogGenresList', () => {
  it('should render correctly', () => {
    const { container } = render(
      <CatalogGenresList genres={mockGenres} activeGenre={activeGenre} setActiveGenre={setActiveGenre} />,
    );

    expect(container.querySelectorAll('.catalog__genres-link').length).toBe(mockGenres.length);
    expect(container.querySelector('.catalog__genres-item--active')?.querySelector('.catalog__genres-link')?.textContent).toBe(activeGenre);
  });

  it('should handle genres click', () => {
    render(
      <CatalogGenresList genres={mockGenres} activeGenre={activeGenre} setActiveGenre={setActiveGenre} />,
    );

    userEvent.click(screen.getByText(ALL_GENRES));
    expect(setActiveGenre).toHaveBeenCalledTimes(1);
    expect(setActiveGenre).toHaveBeenCalledWith(ALL_GENRES);
  });
});

import { render } from '@testing-library/react';
import { lorem } from 'faker';
import CatalogGenresList from './catalog-genres-list';

const mockGenres = lorem.words().split(' ');
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
});

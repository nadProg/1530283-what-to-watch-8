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
    render(
      <CatalogGenresList genres={mockGenres} activeGenre={activeGenre} setActiveGenre={setActiveGenre} />,
    );

    expect(screen.queryAllByTestId('genre-tab-link')).toHaveLength(mockGenres.length);
    expect(screen.queryByTestId('genre-tab-item-active')).toHaveTextContent(activeGenre);
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

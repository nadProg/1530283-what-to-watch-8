import { SyntheticEvent } from 'react';

type CatalogGenresListProps = {
  genres: string[],
  activeGenre: string,
  setActiveGenre: (genre: string) => void,
}

const BASE_CLASSNAME = 'catalog__genres-item';


function CatalogGenresList({genres, activeGenre, setActiveGenre}: CatalogGenresListProps): JSX.Element {
  const handleCatalogItemClick = (evt: SyntheticEvent<HTMLElement>) => {
    evt.preventDefault();
    const newActiveGenre = evt.currentTarget.dataset.value as string;
    setActiveGenre(newActiveGenre);
  };

  return (
    <ul className="catalog__genres-list">
      {
        genres.map((genre) => {
          const activeClassName = genre === activeGenre ? `${BASE_CLASSNAME}--active` : '';
          const fullClassName = `${BASE_CLASSNAME} ${activeClassName}`;

          return (
            <li key={genre} className={fullClassName}>
              <a href="#genre" className="catalog__genres-link" data-value={genre} onClick={handleCatalogItemClick}>{genre}</a>
            </li>
          );
        },
        )
      }
    </ul>
  );
}

export default CatalogGenresList;

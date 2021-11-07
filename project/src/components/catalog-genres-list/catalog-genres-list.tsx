import { SyntheticEvent } from 'react';
import classNames from 'classnames';

type CatalogGenresListProps = {
  genres: string[],
  activeGenre: string,
  setActiveGenre: (genre: string) => void,
}

const BASE_CLASSNAME = 'catalog__genres-item';

function CatalogGenresList({genres, activeGenre, setActiveGenre}: CatalogGenresListProps): JSX.Element {
  const onCatalogItemClick = (evt: SyntheticEvent<HTMLElement>) => {
    evt.preventDefault();
    const newActiveGenre = evt.currentTarget.dataset.value as string;
    setActiveGenre(newActiveGenre);
  };

  return (
    <ul className="catalog__genres-list">
      {
        genres.map((genre) => {
          const fullClassName = classNames(BASE_CLASSNAME, { [`${BASE_CLASSNAME}--active`]: genre === activeGenre });

          return (
            <li key={genre} className={fullClassName} data-testid={genre === activeGenre ? 'genre-tab-item-active' : 'genre-tab-item'}>
              <a href="#genre" className="catalog__genres-link" data-value={genre} onClick={onCatalogItemClick} data-testid="genre-tab-link">{genre}</a>
            </li>
          );
        },
        )
      }
    </ul>
  );
}

export default CatalogGenresList;

import type { Film } from '../../types/types';
import SmallFilmCard from '../small-film-card/small-film-card';

type CatalogFilmsListProps = {
  films: Film[];
}

function CatalogFilmsList({films}: CatalogFilmsListProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {films.map((film) => <SmallFilmCard key={film.id} film={film} className="catalog__films-card" />)}
    </div>
  );
}

export default CatalogFilmsList;



import { useState } from 'react';
import type { Film } from '../../types/types';
import SmallFilmCard from '../small-film-card/small-film-card';

type FilmCardsListProps = {
  films: Film[];
}

function FilmCardsList({films}: FilmCardsListProps): JSX.Element {
  const [ , setActiveFilm ] = useState<Film | null>(null);

  const changeActiveFilm = (film: Film | null) => {
    setActiveFilm(film);
  };

  return (
    <div className="catalog__films-list">
      {films.map((film) => <SmallFilmCard key={film.id} film={film} setActiveFilm={changeActiveFilm} />)}
    </div>
  );
}

export default FilmCardsList;



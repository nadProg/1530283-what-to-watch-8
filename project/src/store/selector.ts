import { createSelector } from 'reselect';
import { MAX_GENRES_COUNT, ALL_GENRES } from '../constants';
import { State } from '../types/types';

const getFilms = ({ films }: State) => films;

const getFiter = ({ filter }: State) => filter;

export const getGenres = createSelector(
  [ getFilms ],
  (films) => {
    const genres = new Set<string>();
    films.forEach((film) => genres.add(film.genre));

    return [ALL_GENRES, ...Array.from(genres).slice(0, MAX_GENRES_COUNT)];
  },
);

export const getFilteredFilms = createSelector(
  [ getFilms, getFiter ],
  (films, filter) => {
    if (!filter || filter === ALL_GENRES) {
      return [ ...films];
    }

    return films.filter((film) => film.genre === filter);
  },
);

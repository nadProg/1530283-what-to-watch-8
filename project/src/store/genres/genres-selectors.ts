import { createSelector } from 'reselect';
import { MAX_GENRES_COUNT, ALL_GENRES } from '../../constants';
import { getAllFilmsData } from '../films/films-selectors';

export const getGenres = createSelector(
  [ getAllFilmsData ],
  (films) => {
    if (!films) {
      return [];
    }

    const genres = new Set<string>();
    films.forEach((film) => genres.add(film.genre));

    return [ALL_GENRES, ...Array.from(genres).slice(0, MAX_GENRES_COUNT)];
  },
);

import { createSelector } from 'reselect';
import { ALL_GENRES } from '../../constants';
import { FetchStatusType, Film, State } from '../../types/types';
import { getFilter } from '../filter/filter-selectors';

export const getAllFilmsData = ({ films }: State): Film[] | null => films.allFilms.data;

export const getPromoFilmData = ({ films }: State): Film | null => films.promoFilm.data;

export const getSimilarFilmsData = ({ films }: State): Film[] | null => films.similarFilms.data;

export const getFavoriteFilmsData = ({ films }: State): Film[] | null => films.favoriteFilms.data;

export const getCurrentFilmData = ({ films }: State): Film | null => films.currentFilm.data;

export const getAllFilmsStatus = ({ films }: State): FetchStatusType => films.allFilms.status;

export const getPromoFilmStatus = ({ films }: State): FetchStatusType => films.promoFilm.status;

export const getSimilarFilmsStatus = ({ films }: State): FetchStatusType => films.similarFilms.status;

export const getFavoriteFilmsStatus = ({ films }: State): FetchStatusType => films.favoriteFilms.status;

export const getCurrentFilmStatus = ({ films }: State): FetchStatusType => films.currentFilm.status;

export const getFilteredFilms = createSelector(
  [ getAllFilmsData, getFilter ],
  (films, filter)=> {
    if (!films) {
      return [];
    }

    if (!filter || filter === ALL_GENRES) {
      return [ ...films];
    }

    return films.filter((film) => film.genre === filter);
  },
);

import { FetchStatus } from '../../constants';
import { FetchedData, Film } from '../../types/types';

export type FilmsState = {
  allFilms: FetchedData<Film[]>,
  promoFilm: FetchedData<Film>,
  currentFilm: FetchedData<Film>,
  similarFilms: FetchedData<Film[]>,
  favoriteFilms: FetchedData<Film[]>,
};

const filmsInitialState: FilmsState = {
  allFilms: {
    data: null,
    status: FetchStatus.Idle,
  },
  promoFilm: {
    data: null,
    status: FetchStatus.Idle,
  },
  currentFilm: {
    data: null,
    status: FetchStatus.Idle,
  },
  similarFilms: {
    data: null,
    status: FetchStatus.Idle,
  },
  favoriteFilms: {
    data: null,
    status: FetchStatus.Idle,
  },
};

export {filmsInitialState};

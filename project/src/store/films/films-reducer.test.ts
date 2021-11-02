import { FetchStatus, UNKNOWN_ACTION } from '../../constants';
import { createMockFilm, createMockFilms } from '../../mocks/films';
import { setAllFilms, setAllFilmsFetchStatus, setCurrentFilm, setCurrentFilmFetchStatus, setFavoriteFilms, setFavoriteFilmsFetchStatus, setPromoFilm, setPromoFilmFetchStatus, setSimilarFilms, setSimilarFilmsFetchStatus } from './films-actions';
import { filmsInitialState } from './films-initial-state';
import { filmsReducer } from './films-reducer';

const mockFilm = createMockFilm();
const mockFilms = createMockFilms();
const mockFetchStatus = FetchStatus.Loading;

describe('Reducer: Films', () => {
  it('without additional parameters should return initial state', () => {
    expect(filmsReducer(void 0 , UNKNOWN_ACTION))
      .toEqual(filmsInitialState);
  });

  it('should set all films data', () => {
    expect(filmsReducer(filmsInitialState, setAllFilms(mockFilms)))
      .toEqual({
        ...filmsInitialState,
        allFilms: {
          ...filmsInitialState.allFilms,
          data: mockFilms,
        },
      });
  });

  it('should set all films fetch status', () => {
    expect(filmsReducer(filmsInitialState, setAllFilmsFetchStatus(mockFetchStatus)))
      .toEqual({
        ...filmsInitialState,
        allFilms: {
          ...filmsInitialState.allFilms,
          status: mockFetchStatus,
        },
      });
  });

  it('should set similar films data', () => {
    expect(filmsReducer(filmsInitialState, setSimilarFilms(mockFilms)))
      .toEqual({
        ...filmsInitialState,
        similarFilms: {
          ...filmsInitialState.similarFilms,
          data: mockFilms,
        },
      });
  });

  it('should set similar films fetch status', () => {
    expect(filmsReducer(filmsInitialState, setSimilarFilmsFetchStatus(mockFetchStatus)))
      .toEqual({
        ...filmsInitialState,
        similarFilms: {
          ...filmsInitialState.similarFilms,
          status: mockFetchStatus,
        },
      });
  });

  it('should set favorite films data', () => {
    expect(filmsReducer(filmsInitialState, setFavoriteFilms(mockFilms)))
      .toEqual({
        ...filmsInitialState,
        favoriteFilms: {
          ...filmsInitialState.favoriteFilms,
          data: mockFilms,
        },
      });
  });

  it('should set favorite films fetch status', () => {
    expect(filmsReducer(filmsInitialState, setFavoriteFilmsFetchStatus(mockFetchStatus)))
      .toEqual({
        ...filmsInitialState,
        favoriteFilms: {
          ...filmsInitialState.favoriteFilms,
          status: mockFetchStatus,
        },
      });
  });

  it('should set promo film data', () => {
    expect(filmsReducer(filmsInitialState, setPromoFilm(mockFilm)))
      .toEqual({
        ...filmsInitialState,
        promoFilm: {
          ...filmsInitialState.promoFilm,
          data: mockFilm,
        },
      });
  });

  it('should set promo film fetch status', () => {
    expect(filmsReducer(filmsInitialState, setPromoFilmFetchStatus(mockFetchStatus)))
      .toEqual({
        ...filmsInitialState,
        promoFilm: {
          ...filmsInitialState.promoFilm,
          status: mockFetchStatus,
        },
      });
  });

  it('should set current film data', () => {
    expect(filmsReducer(filmsInitialState, setCurrentFilm(mockFilm)))
      .toEqual({
        ...filmsInitialState,
        currentFilm: {
          ...filmsInitialState.currentFilm,
          data: mockFilm,
        },
      });
  });

  it('should set current film fetch status', () => {
    expect(filmsReducer(filmsInitialState, setCurrentFilmFetchStatus(mockFetchStatus)))
      .toEqual({
        ...filmsInitialState,
        currentFilm: {
          ...filmsInitialState.currentFilm,
          status: mockFetchStatus,
        },
      });
  });
});

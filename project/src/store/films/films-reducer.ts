import { createReducer } from '@reduxjs/toolkit';
import { setAllFilms, setAllFilmsFetchStatus, setCurrentFilm, setCurrentFilmFetchStatus, setFavoriteFilms, setFavoriteFilmsFetchStatus, setPromoFilmFetchStatus, setPromoFilm, setSimilarFilms, setSimilarFilmsFetchStatus } from './films-actions';
import { filmsInitialState } from './films-initial-state';

const filmsReducer = createReducer(filmsInitialState, (builder) => {
  builder
    .addCase(setAllFilms, (state, action) => {
      state.allFilms.data = action.payload.allFilms;
    })
    .addCase(setAllFilmsFetchStatus, (state, action) => {
      state.allFilms.status = action.payload.status;
    })
    .addCase(setPromoFilm, (state, action) => {
      state.promoFilm.data = action.payload.promoFilm;
    })
    .addCase(setPromoFilmFetchStatus, (state, action) => {
      state.promoFilm.status = action.payload.status;
    })
    .addCase(setFavoriteFilms, (state, action) => {
      state.favoriteFilms.data = action.payload.favoriteFilms;
    })
    .addCase(setFavoriteFilmsFetchStatus, (state, action) => {
      state.favoriteFilms.status = action.payload.status;
    })
    .addCase(setSimilarFilms, (state, action) => {
      state.similarFilms.data = action.payload.similarFilms;
    })
    .addCase(setSimilarFilmsFetchStatus, (state, action) => {
      state.similarFilms.status = action.payload.status;
    })
    .addCase(setCurrentFilm, (state, action) => {
      state.currentFilm.data = action.payload.currentFilm;
    })
    .addCase(setCurrentFilmFetchStatus, (state, action) => {
      state.currentFilm.status = action.payload.status;
    });
});

export {filmsReducer};

import { createReducer } from '@reduxjs/toolkit';
import { setAllFilms, setAllFilmsFetchStatus, setCurrentFilm, setCurrentFilmFetchStatus, setFavoriteFilms, setFavoriteFilmsFetchStatus, setPromoFetchStatus, setPromoFilm, setSimilarFilms, setSimilarFilmsFetchStatus } from './films-actions';
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
    .addCase(setPromoFetchStatus, (state, action) => {
      state.promoFilm.status = action.payload.status;
    })
    .addCase(setFavoriteFilms, (state, action) => {
      state.allFilms.data = action.payload.favoriteFilms;
    })
    .addCase(setFavoriteFilmsFetchStatus, (state, action) => {
      state.allFilms.status = action.payload.status;
    })
    .addCase(setSimilarFilms, (state, action) => {
      state.allFilms.data = action.payload.similarFilms;
    })
    .addCase(setSimilarFilmsFetchStatus, (state, action) => {
      state.allFilms.status = action.payload.status;
    })
    .addCase(setCurrentFilm, (state, action) => {
      state.promoFilm.data = action.payload.currentFilm;
    })
    .addCase(setCurrentFilmFetchStatus, (state, action) => {
      state.promoFilm.status = action.payload.status;
    });
});

export {filmsReducer};

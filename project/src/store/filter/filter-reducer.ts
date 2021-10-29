import { createReducer } from '@reduxjs/toolkit';
import { setFilter } from './filter-actions';
import { filterInitialState } from './filter-initial-state';

const filterReducer = createReducer(filterInitialState, (build) => {
  build
    .addCase(setFilter, (state, action) => action.payload.filter);
});

export {filterReducer};

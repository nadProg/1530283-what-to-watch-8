import { lorem } from 'faker';
import { UNKNOWN_ACTION } from '../../constants';

import { filterReducer } from './filter-reducer';
import { filterInitialState } from './filter-initial-state';
import { setFilter } from './filter-actions';

const TEST_FILTER = lorem.word();

describe('Reducer: Filter', () => {
  it('without additional parameters should return initial state', () => {
    expect(filterReducer(void 0 , UNKNOWN_ACTION))
      .toEqual(filterInitialState);
  });

  it('should set filter value', () => {
    expect(filterReducer(filterInitialState, setFilter(TEST_FILTER)))
      .toEqual(TEST_FILTER);
  });
});

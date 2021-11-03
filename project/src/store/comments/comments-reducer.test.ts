import { FetchStatus, UNKNOWN_ACTION } from '../../constants';
import { commentsReducer } from './comments-reducer';
import { commentsInitialState } from './comments-initial-state';
import { setCurrentComments, setCurrentCommentsFetchStatus, setNewCommentFetchStatus } from './comments-actions';
import { createMockComments } from '../../mocks/comments';

const mockComments = createMockComments();
const mockFetchStatus = FetchStatus.Loading;

describe('Reducer: Comments', () => {
  it('without additional parameters should return initial state', () => {
    expect(commentsReducer(void 0 , UNKNOWN_ACTION))
      .toEqual(commentsInitialState);
  });

  it('should set current comments fetch status', () => {
    expect(commentsReducer(commentsInitialState, setCurrentCommentsFetchStatus(mockFetchStatus)))
      .toEqual({
        ...commentsInitialState,
        currentComments: {
          ...commentsInitialState.currentComments,
          status: mockFetchStatus,
        },
      });
  });

  it('should set current comments data', () => {
    expect(commentsReducer(commentsInitialState, setCurrentComments(mockComments)))
      .toEqual({
        ...commentsInitialState,
        currentComments: {
          ...commentsInitialState.currentComments,
          data: mockComments,
        },
      });
  });

  it('should set new comment fetch status', () => {
    expect(commentsReducer(commentsInitialState, setNewCommentFetchStatus(mockFetchStatus)))
      .toEqual({
        ...commentsInitialState,
        newComment: {
          ...commentsInitialState.newComment,
          status: mockFetchStatus,
        },
      });
  });
});

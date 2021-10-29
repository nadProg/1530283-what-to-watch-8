import { createReducer } from '@reduxjs/toolkit';
import { setCurrentComments, setCurrentCommentsFetchStatus, setNewCommentFetchStatus } from './comments-actions';
import { commentsInitialState } from './comments-initial-state';

const commentsReducer = createReducer(commentsInitialState, (build) => {
  build
    .addCase(setCurrentComments, (state, action) => {
      state.currentComments.data = action.payload.currentComments;
    })
    .addCase(setCurrentCommentsFetchStatus, (state, action) => {
      state.currentComments.status = action.payload.status;
    })
    .addCase(setNewCommentFetchStatus, (state, action) => {
      state.newComment.status = action.payload.status;
    });
});

export {commentsReducer};

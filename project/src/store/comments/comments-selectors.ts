import { createSelector } from 'reselect';
import { FetchStatus } from '../../constants';
import { CommentGet, FetchStatusType, State } from '../../types/types';

export const getCurrentCommentsData = ({ comments }: State): CommentGet[] | null => comments.currentComments.data;

export const getCurrentCommentsStatus = ({ comments }: State): FetchStatusType => comments.currentComments.status;

export const isNewCommentsLoading = createSelector(
  ({ comments }: State) => comments.newComment.status,
  (status) => status === FetchStatus.Loading,
);

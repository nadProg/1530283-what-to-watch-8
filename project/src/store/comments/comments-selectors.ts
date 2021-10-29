import { CommentGet, FetchStatusType, State } from '../../types/types';

export const getCurrentCommentsData = ({ comments }: State): CommentGet[] | null => comments.currentComments.data;

export const getCurrentCommentsStatus = ({ comments }: State): FetchStatusType => comments.currentComments.status;

export const getNewCommentsStatus = ({ comments }: State): FetchStatusType => comments.newComment.status;

import { FetchStatus } from '../../constants';
import { FetchedData, CommentGet, FetchStatusType } from '../../types/types';

export type CommentsState = {
  currentComments: FetchedData<CommentGet[]>,
  newComment: {
    status: FetchStatusType,
  },
};

const commentsInitialState: CommentsState = {
  currentComments: {
    data: null,
    status: FetchStatus.Idle,
  },
  newComment: {
    status: FetchStatus.Idle,
  },
};

export {commentsInitialState};

import toast from 'react-hot-toast';
import { APIRoute, AppRoute, FetchStatus } from '../../constants';
import { adaptCommentToClient } from '../../services/adapters';
import { CommentPost, ServerCommentGet, ThunkActionResult } from '../../types/types';
import { redirectToRoute } from '../app/app-actions';
import { setCurrentCommentsFetchStatus, setCurrentComments, setNewCommentFetchStatus } from './comments-actions';

export const getCurrentComments = (filmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setCurrentCommentsFetchStatus(FetchStatus.Loading));

    try {
      const { data: serverComments } = await api.get<ServerCommentGet[]>(APIRoute.Comments(filmId));

      const comments = serverComments.map((serverComment) => adaptCommentToClient(serverComment));

      dispatch(setCurrentComments(comments));
      dispatch(setCurrentCommentsFetchStatus(FetchStatus.Succeeded));

    } catch {
      dispatch(setCurrentCommentsFetchStatus(FetchStatus.Failed));
    }
  };

export const postComment = (filmId: number, formData: CommentPost): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setNewCommentFetchStatus(FetchStatus.Loading));

    try {
      const { data: serverComments } = await api.post<ServerCommentGet[]>(APIRoute.Comments(filmId), formData);

      const comments = serverComments.map((serverComment) => adaptCommentToClient(serverComment));

      dispatch(setCurrentComments(comments));
      dispatch(setNewCommentFetchStatus(FetchStatus.Succeeded));
      dispatch(setCurrentCommentsFetchStatus(FetchStatus.Succeeded));
      dispatch(redirectToRoute(AppRoute.Film(filmId)));

    } catch {
      toast.error('Failed to add review');
      dispatch(setNewCommentFetchStatus(FetchStatus.Failed));
    }
  };

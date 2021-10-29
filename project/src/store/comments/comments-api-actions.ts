import toast from 'react-hot-toast';
import { APIRoute, AppRoute, FetchStatus } from '../../constants';
import { CommentGet, CommentPost, ThunkActionResult } from '../../types/types';
import { redirectToRoute } from '../actions';
import { setCurrentCommentsFetchStatus, setCurrentComments, setNewCommentFetchStatus } from './comments-actions';

export const getСurrentComments = (filmId: number): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setCurrentCommentsFetchStatus(FetchStatus.Loading));

    try {
      const { data: comments } = await api.get<CommentGet[]>(APIRoute.Comments(filmId));

      dispatch(setCurrentComments(comments));
      dispatch(setCurrentCommentsFetchStatus(FetchStatus.Succeeded));

    } catch (error) {
      dispatch(setCurrentCommentsFetchStatus(FetchStatus.Failed));
    }
  };

export const postComment = (filmId: number, formData: CommentPost): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    dispatch(setNewCommentFetchStatus(FetchStatus.Loading));

    try {
      const { data: comments } = await api.post<CommentGet[]>(APIRoute.Comments(filmId), formData);

      dispatch(setCurrentComments(comments));
      dispatch(setNewCommentFetchStatus(FetchStatus.Succeeded));
      dispatch(setCurrentCommentsFetchStatus(FetchStatus.Succeeded));
      dispatch(redirectToRoute(AppRoute.Film(filmId)));

    } catch (error) {
      toast.error('Failed to add review');
      dispatch(setNewCommentFetchStatus(FetchStatus.Failed));
    }
  };

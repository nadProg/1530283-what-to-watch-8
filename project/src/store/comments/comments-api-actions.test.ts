import { datatype } from 'faker';
import thunk from 'redux-thunk';
import { ThunkDispatch } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { APIRoute, AppRoute, FetchStatus } from '../../constants';
import { redirectToRoute } from '../app/app-actions';
import { adaptCommentToClient } from '../../services/adapters';
import { Action, State } from '../../types/types';
import { createAPI } from '../../services/api';
import { createMockNewComment, createServerMockComments } from '../../mocks/comments';
import { getСurrentComments, postComment } from './comments-api-actions';
import { setCurrentComments, setCurrentCommentsFetchStatus, setNewCommentFetchStatus } from './comments-actions';

const mockFilmId = datatype.number();
const mockNewComment = createMockNewComment();
const mockServerComments = createServerMockComments();
const adaptedMockComments = mockServerComments.map((mockServerComment) => adaptCommentToClient(mockServerComment));

describe('Api-actions: Comments', () => {
  const fakeUnauthorizedCallback = jest.fn();
  const api = createAPI(fakeUnauthorizedCallback());
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

  it('should handle succeed get comments request', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Comments(mockFilmId))
      .reply(200, mockServerComments);

    await store.dispatch(getСurrentComments(mockFilmId));

    expect(store.getActions()).toEqual([
      setCurrentCommentsFetchStatus(FetchStatus.Loading),
      setCurrentComments(adaptedMockComments),
      setCurrentCommentsFetchStatus(FetchStatus.Succeeded),
    ]);
  });

  it('should handle failed get comments request', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Comments(mockFilmId))
      .reply(400);

    await store.dispatch(getСurrentComments(mockFilmId));

    expect(store.getActions()).toEqual([
      setCurrentCommentsFetchStatus(FetchStatus.Loading),
      setCurrentCommentsFetchStatus(FetchStatus.Failed),
    ]);
  });

  it('should handle succeed post comment request', async () => {
    const store = mockStore();
    mockAPI
      .onPost(APIRoute.Comments(mockFilmId), mockNewComment)
      .reply(200, mockServerComments);

    await store.dispatch(postComment(mockFilmId, mockNewComment));

    expect(store.getActions()).toEqual([
      setNewCommentFetchStatus(FetchStatus.Loading),
      setCurrentComments(adaptedMockComments),
      setNewCommentFetchStatus(FetchStatus.Succeeded),
      setCurrentCommentsFetchStatus(FetchStatus.Succeeded),
      redirectToRoute(AppRoute.Film(mockFilmId)),
    ]);
  });

  it('should handle failed post comment request', async () => {
    const store = mockStore();
    mockAPI
      .onPost(APIRoute.Comments(mockFilmId), mockNewComment)
      .reply(400);

    await store.dispatch(postComment(mockFilmId, mockNewComment));

    expect(store.getActions()).toEqual([
      setNewCommentFetchStatus(FetchStatus.Loading),
      setNewCommentFetchStatus(FetchStatus.Failed),
    ]);
  });
});

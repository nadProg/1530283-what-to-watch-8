import { datatype, date, internet, lorem } from 'faker';
import type { CommentGet, CommentPost, ServerCommentGet } from '../types/types';

export const createMockNewComment = (): CommentPost => ({
  rating: datatype.number(),
  comment: lorem.paragraphs(),
});

export const createMockComment = (): CommentGet  => ({
  id: datatype.number(),
  user: {
    id: datatype.number(),
    name: internet.userName(),
  },
  date: date.recent(),
  rating: datatype.number(),
  comment: lorem.paragraphs(),
});

export const createMockServerComment = (): ServerCommentGet  => ({
  id: datatype.number(),
  user: {
    id: datatype.number(),
    name: internet.userName(),
  },
  date: date.recent().toISOString(),
  rating: datatype.number(),
  comment: lorem.paragraphs(),
});

export const createMockComments = (): CommentGet[] => {
  const amount = datatype.number({
    min: 1,
    max: 10,
  });

  const mockComments = new Array(amount).fill(null).map(() => createMockComment());

  return mockComments;
};

export const createServerMockComments = (): ServerCommentGet[] => {
  const amount = datatype.number({
    min: 1,
    max: 10,
  });

  const mockComments = new Array(amount).fill(null).map(() => createMockServerComment());

  return mockComments;
};

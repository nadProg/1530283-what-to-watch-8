import { datatype, date, internet, lorem } from 'faker';
import type { CommentGet } from '../types/types';

const createMockComment = (): CommentGet  => ({
  id: datatype.number(),
  user: {
    id: datatype.number(),
    name: internet.userName(),
  },
  date: date.recent(),
  rating: datatype.number(),
  comment: lorem.paragraphs(),
});

const createMockComments = (): CommentGet[] => {
  const amount = datatype.number(10);

  const mockComments = new Array(amount).fill(null).map(() => createMockComment());

  return mockComments;
};

export { createMockComments };

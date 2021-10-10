import type { CommentGet } from '../types/types';
import { getRandomInteger, getRandomItemFromArray } from '../utils/common';

const now = Date.now();
const yearAgo = now - 1000 * 60 * 60 * 24 * 365;

const COMMENT_COUNT = 8;

const ratings = [5.0, 7.0, 8.0, 6.6, 7.7, 8.5, 5.6, 8.8];

const names = ['Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan', 'Bill Murray', 'Edward Norton', 'Jude Law', 'Willem Dafoe', 'Saoirse Ronan'];

const comments: CommentGet[] = new Array(getRandomInteger(COMMENT_COUNT / 2, COMMENT_COUNT)).fill(null).map((item, index) => ({
  id: index,
  user: {
    id: index + 10,
    name: getRandomItemFromArray(names),
  },
  rating: getRandomItemFromArray(ratings),
  comment: 'Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director\'s funniest and most exquisitely designed movies in years.',
  date: new Date(getRandomInteger(yearAgo, now)),
}));

export { comments };

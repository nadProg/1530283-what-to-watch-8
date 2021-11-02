import { datatype, date, internet, lorem, name } from 'faker';
import type { Film } from '../types/types';

const createFullName = () => `${name.firstName()} ${name.lastName()}`;

export const createMockFilm = (): Film => {
  const actorsAmount = datatype.number(8);
  const actors = new Array(actorsAmount).fill(null).map(() => createFullName());

  return {
    id: datatype.number(),
    name: lorem.words(),
    posterImage: internet.url(),
    previewImage: internet.url(),
    backgroundImage: internet.url(),
    backgroundColor: internet.color(),
    videoLink: internet.url(),
    previewVideoLink: internet.url(),
    description: lorem.paragraphs(),
    rating: datatype.number(),
    scoresCount: datatype.number(),
    director: createFullName(),
    genre: lorem.word(),
    runTime: datatype.number(),
    actors,
    released: date.past().getFullYear(),
    isFavorite: datatype.boolean(),
  };
};

export const createMockFilms = (): Film[] => {
  const amount = datatype.number(30);
  const mockFilms = new Array(amount).fill(null).map(() => createMockFilm());
  return mockFilms;
};

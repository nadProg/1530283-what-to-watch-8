import { datatype, date, internet, lorem, name } from 'faker';
import type { Film, ServerFilm } from '../types/types';

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

export const createMockServerFilm = (): ServerFilm => {
  const actorsAmount = datatype.number(8);
  const actors = new Array(actorsAmount).fill(null).map(() => createFullName());

  return {
    id: datatype.number(),
    name: lorem.words(),
    'poster_image': internet.url(),
    'preview_image': internet.url(),
    'background_image': internet.url(),
    'background_color': internet.color(),
    'video_link': internet.url(),
    'preview_video_link': internet.url(),
    description: lorem.paragraphs(),
    rating: datatype.number(),
    'scores_count': datatype.number(),
    director: createFullName(),
    genre: lorem.word(),
    'run_time': datatype.number(),
    starring: actors,
    released: date.past().getFullYear(),
    'is_favorite': datatype.boolean(),
  };
};

export const createMockServerFilms = (): ServerFilm[] => {
  const amount = datatype.number(30);
  const mockFilms = new Array(amount).fill(null).map(() => createMockServerFilm());
  return mockFilms;
};

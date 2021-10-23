import camelCase from 'lodash/camelCase';
import { ServerFilm, Film } from '../types/types';

export const adaptFilmToClient = (serverFilm: ServerFilm): Film => {
  const clientFilm: {
    [key: string]: number | string | string[] | boolean,
  } = {};

  Object.entries(serverFilm).forEach(([key, value]) => {
    clientFilm[camelCase(key)] = value;
  });

  clientFilm.actors = serverFilm.starring;
  delete clientFilm.starring;

  return clientFilm as Film;
};

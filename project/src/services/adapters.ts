import camelCase from 'lodash/camelCase';
import { ServerFilm, Film, ServerAuthInfo, AuthoarizationInfo } from '../types/types';

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

export const adaptAuthorizationInfoToClient = (serverAuthorizationInfo: ServerAuthInfo): AuthoarizationInfo => {
  const authInfo: {
    [key: string]: number | string;
  } = {};

  Object.entries(serverAuthorizationInfo).forEach(([key, value]) => {
    authInfo[camelCase(key)] = value;
  });


  return authInfo as AuthoarizationInfo;
};

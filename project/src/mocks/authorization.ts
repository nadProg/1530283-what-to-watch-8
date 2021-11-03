import { datatype, internet } from 'faker';
import { AuthoarizationInfo, Login, ServerAuthInfo } from '../types/types';

export const createMockAuthorizationInfo = (): AuthoarizationInfo => ({
  id: datatype.number(),
  email: internet.email(),
  name: internet.userName(),
  avatarUrl: internet.url(),
  token: datatype.uuid(),
});

export const createMockServerAuthorizationInfo = (): ServerAuthInfo => ({
  id: datatype.number(),
  email: internet.email(),
  name: internet.userName(),
  'avatar_url': internet.url(),
  token: datatype.uuid(),
});

export const createMockLoginData = (): Login  => ({
  email: internet.email(),
  password: internet.password(),
});

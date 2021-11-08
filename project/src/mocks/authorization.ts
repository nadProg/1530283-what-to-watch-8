import { datatype, internet } from 'faker';
import { AuthorizationInfo, Login, ServerAuthorizationInfo } from '../types/types';

export const createMockAuthorizationInfo = (): AuthorizationInfo => ({
  id: datatype.number(),
  email: internet.email(),
  name: internet.userName(),
  avatarUrl: internet.url(),
  token: datatype.uuid(),
});

export const createMockServerAuthorizationInfo = (): ServerAuthorizationInfo => ({
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

import { RouteProps } from 'react-router';
import { AuthorizationStatus } from '../const';

export type MainFilmCard = {
  title: string,
  genre: string,
  year: number,
}

export type MainScreenProps = {
  mainFilmCard: MainFilmCard,
}
export type LogoProps = {
  theme?: 'light',
}

export type PrivateRouteProps = RouteProps & {
  authorizationStatus: typeof AuthorizationStatus[keyof typeof AuthorizationStatus],
}

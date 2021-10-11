import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AuthorizationStatus, CustomRouteType, AppRoute } from '../../const';
import type { ValuesOf } from '../../types/types';

type CustomRouteProps = RouteProps & {
  type: ValuesOf<typeof CustomRouteType>,
  authorizationStatus:  ValuesOf<typeof AuthorizationStatus>,
}

function CustomRoute({authorizationStatus, type, ...props}: CustomRouteProps): JSX.Element {
  switch (type) {
    case CustomRouteType.Private:
      return (
        <Route { ...props }>
          { authorizationStatus === AuthorizationStatus.Auth ? props.children : <Redirect to={AppRoute.Login()} />}
        </Route>
      );
    case CustomRouteType.Guest:
      return (
        <Route { ...props }>
          { authorizationStatus === AuthorizationStatus.NotAuth ? props.children : <Redirect to={AppRoute.Root()} />}
        </Route>
      );
    default:
      throw new Error(`Type ${type} of CustomRoute does not exist!`);
  }
}

export default CustomRoute;

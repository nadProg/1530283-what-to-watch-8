import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AuthorizationStatus, CustomRouteType, AppRoute } from '../../constants';
import type { ValuesOf } from '../../types/types';
import { isAllCasesChecked } from '../../utils/common';

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
  }

  isAllCasesChecked(type);
}

export default CustomRoute;

import { useSelector } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import type { ValuesOf } from '../../types/types';
import { AuthorizationStatus, CustomRouteType, AppRoute } from '../../constants';
import { isAllCasesChecked } from '../../utils/common';
import { getAuhorizationStatus } from '../../store/authorization/authorization-selectors';

type CustomRouteProps = RouteProps & {
  type: ValuesOf<typeof CustomRouteType>,
}

function CustomRoute({type, ...props}: CustomRouteProps): JSX.Element {
  const authorizationStatus = useSelector(getAuhorizationStatus);

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

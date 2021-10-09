import { Redirect, Route } from 'react-router';
import { AuthorizationStatus } from '../../const';
import type { CustomRouteProps } from '../../types/types';

function PrivateRoute({authorizationStatus, ...props}: CustomRouteProps): JSX.Element {
  return (
    <Route { ...props }>
      { authorizationStatus === AuthorizationStatus.Auth ? props.children : <Redirect to='/login' />}
    </Route>
  );
}

export default PrivateRoute;

import { Redirect, Route } from 'react-router';
import { AuthorizationStatus } from '../../const';
import type { PrivateRouteProps } from '../../types/types';

function PrivateRoute({authorizationStatus, ...props}:PrivateRouteProps): JSX.Element {
  return (
    <Route { ...props }>
      { authorizationStatus === AuthorizationStatus.Auth ? props.children : <Redirect to='/login' />}
    </Route>
  );
}

export default PrivateRoute;

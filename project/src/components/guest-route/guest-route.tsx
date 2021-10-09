import { Redirect, Route } from 'react-router';
import { AuthorizationStatus } from '../../const';
import type { CustomRouteProps } from '../../types/types';

function GuestRoute({authorizationStatus, ...props}: CustomRouteProps): JSX.Element {
  return (
    <Route { ...props }>
      { authorizationStatus === AuthorizationStatus.NotAuth ? props.children : <Redirect to='/' />}
    </Route>
  );
}

export default GuestRoute;

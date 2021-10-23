import { connect, ConnectedProps } from 'react-redux';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { AuthorizationStatus, CustomRouteType, AppRoute } from '../../constants';
import type { State, ValuesOf } from '../../types/types';
import { isAllCasesChecked } from '../../utils/common';

const mapStateToProps = ({authorization}: State) => ({
  authorization,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type CustomRouteProps = RouteProps & PropsFromRedux & {
  type: ValuesOf<typeof CustomRouteType>,
}

function CustomRoute({authorization, type, ...props}: CustomRouteProps): JSX.Element {
  switch (type) {
    case CustomRouteType.Private:
      return (
        <Route { ...props }>
          { authorization.status === AuthorizationStatus.Auth ? props.children : <Redirect to={AppRoute.Login()} />}
        </Route>
      );
    case CustomRouteType.Guest:
      return (
        <Route { ...props }>
          { authorization.status === AuthorizationStatus.NotAuth ? props.children : <Redirect to={AppRoute.Root()} />}
        </Route>
      );
  }

  isAllCasesChecked(type);
}

export {CustomRoute};
export default connector(CustomRoute);

import { Router as BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import type { State, ThunkAppDispatch } from '../../types/types';
import { AppRoute, AuthorizationStatus, CustomRouteType } from '../../constants';
import CustomRoute from '../custom-route/custom-route';
import MainScreen from '../main-screen/main-screen';
import FilmScreen from '../film-screen/film-screen';
import PlayerScreen from '../player-screen/player-screen';
import LoginScreen from '../login-screen/login-screen';
import MyListScreen from '../my-list-screen/my-list-screen';
import AddReviewScreen from '../add-review-screen/add-review-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import { useEffect } from 'react';
import browserHistory from '../../browser-history';
import { getLogin } from '../../store/authorization/authorization-api-actions';

const mapStateToProps = ({films, authorization}: State) => ({
  authorizationStatus: authorization.status,
  fetchedFilms: films,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  checkAuthorization() {
    dispatch(getLogin());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App({ authorizationStatus, checkAuthorization }: PropsFromRedux): JSX.Element {
  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Unknown) {
      checkAuthorization();
    }
  }, []);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route path={AppRoute.Root()} exact>
          <MainScreen />
        </Route>
        <Route path={AppRoute.Film()} exact>
          <FilmScreen />
        </Route>
        <Route path={AppRoute.Player()} exact>
          <PlayerScreen />
        </Route>
        <CustomRoute path={AppRoute.Login()} exact type={CustomRouteType.Guest}>
          <LoginScreen />
        </CustomRoute>
        <CustomRoute path={AppRoute.MyList()} exact type={CustomRouteType.Private}>
          <MyListScreen />
        </CustomRoute>
        <CustomRoute path={AppRoute.AddReview()} exact type={CustomRouteType.Private}>
          <AddReviewScreen />
        </CustomRoute>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export { App };
export default connector(App);

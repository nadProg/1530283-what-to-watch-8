import { BrowserRouter, Switch, Route } from 'react-router-dom';
import type { AppProps } from '../../types/types';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import MainScreen from '../main-screen/main-screen';
import FilmScreen from '../film-screen/film-screen';
import PlayerScreen from '../player-screen/player-screen';
import LoginScreen from '../login-screen/login-screen';
import MyListscreen from '../my-list-screen/my-list-screen';
import ReviewScreen from '../review-screen/review-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function App({films}: AppProps): JSX.Element {
  const promoFilm = films[0];

  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Root} exact>
          <MainScreen promoFilm={promoFilm} films={films} />
        </Route>
        <Route path={AppRoute.Film} exact>
          <FilmScreen />
        </Route>
        <Route path={AppRoute.Player} exact>
          <PlayerScreen />
        </Route>
        <Route path={AppRoute.Login} exact>
          <LoginScreen />
        </Route>
        <PrivateRoute path={AppRoute.MyList} exact authorizationStatus={AuthorizationStatus.Auth}>
          <MyListscreen />
        </PrivateRoute>
        <PrivateRoute path={AppRoute.Review} exact authorizationStatus={AuthorizationStatus.Auth}>
          <ReviewScreen />
        </PrivateRoute>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

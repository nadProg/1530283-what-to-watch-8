import { BrowserRouter, Switch, Route } from 'react-router-dom';
import type { Film } from '../../types/types';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import GuestRoute from '../guest-route/guest-route';
import MainScreen from '../main-screen/main-screen';
import FilmScreen from '../film-screen/film-screen';
import PlayerScreen from '../player-screen/player-screen';
import LoginScreen from '../login-screen/login-screen';
import MyListScreen from '../my-list-screen/my-list-screen';
import ReviewScreen from '../review-screen/review-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type AppProps = {
  films: Film[],
}

function App({films}: AppProps): JSX.Element {
  console.log(films);

  const authorizationStatus = AuthorizationStatus.Auth;

  const promoFilm = films[0];

  const getFilmById = (id: number) => {
    const foundFilm = films.find((film) => film.id === id);

    if (!foundFilm) {
      throw new Error(`Film with id=${id} does not exist`);
    }

    return foundFilm;
  };

  const getSimilarFilms = () => films.slice().sort(() => Math.random() - 0.5).slice(0, 4);

  const getFavoriteFilms = () => films.filter((film) => film.isFavorite);

  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Root} exact>
          <MainScreen promoFilm={promoFilm} films={films} />
        </Route>
        <Route path={AppRoute.Film} exact>
          <FilmScreen getFilmById={getFilmById} getSimilarFilms={getSimilarFilms} />
        </Route>
        <Route path={AppRoute.Player} exact>
          <PlayerScreen getFilmById={getFilmById} />
        </Route>
        <GuestRoute path={AppRoute.Login} exact authorizationStatus={authorizationStatus}>
          <LoginScreen />
        </GuestRoute>
        <PrivateRoute path={AppRoute.MyList} exact authorizationStatus={authorizationStatus}>
          <MyListScreen getFavoriteFilms={getFavoriteFilms} />
        </PrivateRoute>
        <PrivateRoute path={AppRoute.Review} exact authorizationStatus={authorizationStatus}>
          <ReviewScreen getFilmById={getFilmById} />
        </PrivateRoute>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

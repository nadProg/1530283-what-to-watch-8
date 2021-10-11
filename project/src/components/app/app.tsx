import { BrowserRouter, Switch, Route } from 'react-router-dom';
import type { Film, CommentGet } from '../../types/types';
import { AppRoute, AuthorizationStatus, CustomRouteType } from '../../const';
import CustomRoute from '../custom-route/custom-route';
import MainScreen from '../main-screen/main-screen';
import FilmScreen from '../film-screen/film-screen';
import PlayerScreen from '../player-screen/player-screen';
import LoginScreen from '../login-screen/login-screen';
import MyListScreen from '../my-list-screen/my-list-screen';
import AddReviewScreen from '../add-review-screen/add-review-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';

type AppProps = {
  films: Film[],
  comments: CommentGet[],
}

function App({films, comments}: AppProps): JSX.Element {
  const authorizationStatus = AuthorizationStatus.Auth;

  const promoFilm = films[0];

  const getFilmById = (id: number) => {
    const foundFilm = films.find((film) => film.id === id);

    if (!foundFilm) {
      throw new Error(`Film with id=${id} does not exist`);
    }

    return foundFilm;
  };

  const getComments = () => comments.slice();

  const getSimilarFilms = () => films.slice().sort(() => Math.random() - 0.5).slice(0, 4);

  const getFavoriteFilms = () => films.filter((film) => film.isFavorite);

  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Root()} exact>
          <MainScreen promoFilm={promoFilm} films={films} />
        </Route>
        <Route path={AppRoute.Film()} exact>
          <FilmScreen getFilmById={getFilmById} getComments={getComments} getSimilarFilms={getSimilarFilms} />
        </Route>
        <Route path={AppRoute.Player()} exact>
          <PlayerScreen getFilmById={getFilmById} />
        </Route>
        <CustomRoute path={AppRoute.Login()} exact type={CustomRouteType.Guest} authorizationStatus={authorizationStatus}>
          <LoginScreen />
        </CustomRoute>
        <CustomRoute path={AppRoute.MyList()} exact type={CustomRouteType.Private} authorizationStatus={authorizationStatus}>
          <MyListScreen getFavoriteFilms={getFavoriteFilms} />
        </CustomRoute>
        <CustomRoute path={AppRoute.AddReview()} exact type={CustomRouteType.Private} authorizationStatus={authorizationStatus}>
          <AddReviewScreen getFilmById={getFilmById} />
        </CustomRoute>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

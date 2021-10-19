import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import type { CommentGet, State } from '../../types/types';
import { AppRoute, AuthorizationStatus, CustomRouteType } from '../../constants';
import CustomRoute from '../custom-route/custom-route';
import MainScreen from '../main-screen/main-screen';
import FilmScreen from '../film-screen/film-screen';
import PlayerScreen from '../player-screen/player-screen';
import LoginScreen from '../login-screen/login-screen';
import MyListScreen from '../my-list-screen/my-list-screen';
import AddReviewScreen from '../add-review-screen/add-review-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';

const mapStateToProps = ({films}: State) => ({
  films,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type AppProps = PropsFromRedux & {
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

  const getSimilarFilms = (id: number) => {
    const referenceFilm = getFilmById(id);
    return films.filter((film) => film.id !== id && film.genre === referenceFilm.genre);
  };

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

export { App };
export default connector(App);

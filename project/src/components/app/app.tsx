import { BrowserRouter, Switch, Route } from 'react-router-dom';
import type { MainFilmCard } from '../../types/types';
import { AppRoute } from '../../const';
import MainScreen from '../main-screen/main-screen';
import FilmScreen from '../film-screen/film-screen';
import PlayerScreen from '../player-screen/player-screen';
import LoginScreen from '../login-screen/login-screen';
import MyListscreen from '../my-list-screen/my-list-screen';
import ReviewScreen from '../review-screen/review-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';

const mainFilmCard: MainFilmCard = {
  title: 'The Grand Budapest Hotel',
  genre:  'Drama',
  year: 2014,
};

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={AppRoute.Root} exact>
          <MainScreen mainFilmCard={mainFilmCard}/>
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
        <Route path={AppRoute.MyList} exact>
          <MyListscreen />
        </Route>
        <Route path={AppRoute.Review} exact>
          <ReviewScreen />
        </Route>
        <Route>
          <NotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

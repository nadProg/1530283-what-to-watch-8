import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import type { State, ThunkAppDispatch } from '../../types/types';
import { AppRoute, CustomRouteType } from '../../constants';
import { getFilms } from '../../store/api-actions';
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
import { isFetchError, isFetchIdle, isFetchNotReady } from '../../utils/fetched-data';
import InfoScreen from '../info-screen/info-screen';
import PageTitle from '../page-title/page-title';

const mapStateToProps = ({films}: State) => ({
  fetchedFilms: films,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchFilms() {
    dispatch(getFilms());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function App({ fetchedFilms, fetchFilms }: PropsFromRedux): JSX.Element {
  useEffect(() => {
    // Здесь будет первичная проверка статуса авторизации

    if (isFetchIdle(fetchedFilms)) {
      // Когда все данные будут загружаться с сервера
      // данная загрузка возможна будет перенесена в MainScreen
      // т.к. список всех фильмов нужен только там
      fetchFilms();
    }
  }, []);

  if (isFetchNotReady(fetchedFilms)) {
    return <LoadingScreen />;
  }

  if (isFetchError(fetchedFilms)) {
    return (
      <InfoScreen>
        <PageTitle hidden>Error screen</PageTitle>
        <p>An error has occured</p>
        <p>The apllication is unavailable now</p>
        <p>Please try later</p>
      </InfoScreen>
    );
  }

  return (
    <BrowserRouter>
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

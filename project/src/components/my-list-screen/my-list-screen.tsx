import { useEffect } from 'react';
import type { Film, State, ThunkAppDispatch } from '../../types/types';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import CatalogFilmsList from '../catalog-films-list/catalog-films-list';
import PageFooter from '../page-footer/page-footer';
import Catalog from '../catalog/catalog';
import PageTitle from '../page-title/page-title';
import PageHeader from '../page-header/page-header';
import { connect, ConnectedProps } from 'react-redux';
import { isFetchError, isFetchNotReady } from '../../utils/fetched-data';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import { getFavoriteFilms } from '../../store/films/films-api-actions';

const mapStateToProps = ({films}: State) => ({
  fetchedFavoriteFilms: films.favoriteFilms,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchFavoriteFilms() {
    dispatch(getFavoriteFilms());
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function MyListScreen({fetchedFavoriteFilms, fetchFavoriteFilms}: PropsFromRedux): JSX.Element {
  useEffect(() => {
    fetchFavoriteFilms();
  }, []);

  if (isFetchNotReady(fetchedFavoriteFilms)) {
    return <LoadingScreen />;
  }

  if (isFetchError(fetchedFavoriteFilms)) {
    return <NotFoundScreen />;
  }

  const favoriteFilms = fetchedFavoriteFilms.data as Film[];

  return (
    <div className="user-page">
      <PageHeader className="user-page__head">
        <Logo />
        <PageTitle className="user-page__title">My list</PageTitle>
        <UserBlock />
      </PageHeader>
      <Catalog hiddenTitle="Catalog">
        <CatalogFilmsList films={favoriteFilms} />
      </Catalog>
      <PageFooter />
    </div>
  );
}

export {MyListScreen};
export default connector(MyListScreen);

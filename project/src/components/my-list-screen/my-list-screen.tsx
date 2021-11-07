import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import CatalogFilmsList from '../catalog-films-list/catalog-films-list';
import PageFooter from '../page-footer/page-footer';
import Catalog from '../catalog/catalog';
import PageTitle from '../page-title/page-title';
import PageHeader from '../page-header/page-header';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import { getFavoriteFilms } from '../../store/films/films-api-actions';
import { getFavoriteFilmsData, getFavoriteFilmsStatus } from '../../store/films/films-selectors';
import { isFetchError, isFetchNotReady } from '../../utils/fetched-data';

function MyListScreen(): JSX.Element {
  const favoriteFilms = useSelector(getFavoriteFilmsData);
  const favoriteFilmsStatus = useSelector(getFavoriteFilmsStatus);

  const dispatch = useDispatch();

  const fetchFavoriteFilms = () => {
    dispatch(getFavoriteFilms());
  };

  useEffect(() => {
    fetchFavoriteFilms();
  }, []);

  if (isFetchNotReady(favoriteFilmsStatus)) {
    return <LoadingScreen />;
  }

  if (isFetchError(favoriteFilmsStatus) || !favoriteFilms) {
    return <NotFoundScreen />;
  }

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

export default MyListScreen;

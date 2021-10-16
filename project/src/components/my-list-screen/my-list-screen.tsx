import type { Film } from '../../types/types';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import CatalogFilmsList from '../catalog-films-list/catalog-films-list';
import PageFooter from '../page-footer/page-footer';
import Catalog from '../catalog/catalog';

export type MyListScreenProps = {
  getFavoriteFilms: () => Film[],
}

function MyListScreen({getFavoriteFilms}: MyListScreenProps): JSX.Element {
  const favoriteFilms = getFavoriteFilms();

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">My list</h1>
        <UserBlock />
      </header>
      <Catalog hiddenTitle="Catalog">
        <CatalogFilmsList films={favoriteFilms} />
      </Catalog>
      <PageFooter />
    </div>
  );
}

export default MyListScreen;

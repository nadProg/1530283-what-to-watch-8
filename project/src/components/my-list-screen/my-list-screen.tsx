import type { Film } from '../../types/types';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import CatalogFilmsList from '../catalog-films-list/catalog-films-list';
import PageFooter from '../page-footer/page-footer';
import Catalog from '../catalog/catalog';
import PageTitle from '../page-title/page-title';
import PageHeader from '../page-header/page-header';

export type MyListScreenProps = {
  getFavoriteFilms: () => Film[],
}

function MyListScreen({getFavoriteFilms}: MyListScreenProps): JSX.Element {
  const favoriteFilms = getFavoriteFilms();

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

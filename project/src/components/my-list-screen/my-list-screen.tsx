import type { Film } from '../../types/types';
import Logo from '../ui/logo/logo';
import UserBlock from '../user-block/user-block';
import FilmCardsList from '../films-list/films-list';
import Footer from '../ui/footer/footer';

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

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmCardsList films={favoriteFilms} />
      </section>

      <Footer />
    </div>
  );
}

export default MyListScreen;

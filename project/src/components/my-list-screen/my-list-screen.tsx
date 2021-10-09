import type { MyListScreenProps } from '../../types/types';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import SmallFilmCard from '../small-film-card/small-film-card';

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

        <div className="catalog__films-list">
          {favoriteFilms.map((favoriteFilm) => <SmallFilmCard key={favoriteFilm.id} film={favoriteFilm} />)}
        </div>
      </section>

      <footer className="page-footer">
        <Logo theme="light" />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
}

export default MyListScreen;

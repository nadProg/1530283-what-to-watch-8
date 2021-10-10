import FilmCardsList from '../films-list/films-list';
import type { Film } from '../../types/types';
import Logo from '../logo/logo';
import PromoFilmCard from '../promo-film-card/promo-film-card';
import GenreFilter from '../genre-filter/genre-filter';

type MainScreenProps = {
  promoFilm: Film,
  films: Film[],
}

function MainScreen({promoFilm, films}: MainScreenProps): JSX.Element {
  return (
    <>
      <PromoFilmCard film={promoFilm} />

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreFilter />

          <FilmCardsList films={films} />

          <div className="catalog__more">
            <button className="catalog__button" type="button">Show more</button>
          </div>
        </section>

        <footer className="page-footer">
          <Logo theme="light" />

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    </>
  );
}

export default MainScreen;

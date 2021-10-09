import { useParams } from 'react-router-dom';
import type { FilmsScreenProps, Params } from '../../types/types';
import SmallFilmCard from '../small-film-card/small-film-card';
import FullFilmCard from '../full-film-card/full-film-card';
import Logo from '../logo/logo';

function FilmScreen({getFilmById, getSimilarFilms}: FilmsScreenProps): JSX.Element {
  const { id } = useParams() as Params;
  const film = getFilmById(Number(id));
  const similarFilms = getSimilarFilms();

  return (
    <>
      <FullFilmCard film={film} />

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <div className="catalog__films-list">
            {similarFilms.map((similarFilm) => <SmallFilmCard key={similarFilm.id} film={similarFilm} />)}
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

export default FilmScreen;

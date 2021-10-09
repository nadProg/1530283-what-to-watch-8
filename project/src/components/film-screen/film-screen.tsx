import { useParams } from 'react-router-dom';
import type { FilmsScreenProps, Params } from '../../types/types';
import FilmCardsList from '../films-list/films-list';
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

          <FilmCardsList films={similarFilms} />
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

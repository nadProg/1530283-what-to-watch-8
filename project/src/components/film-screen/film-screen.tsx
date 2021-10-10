import { useParams } from 'react-router-dom';
import type { CommentGet, Film, Params } from '../../types/types';
import FilmCardsList from '../films-list/films-list';
import FullFilmCard from '../full-film-card/full-film-card';
import Footer from '../ui/footer/footer';

type FilmsScreenProps = {
  getFilmById: (id: number) => Film,
  getSimilarFilms: () => Film[],
  getComments: () => CommentGet[],
}
function FilmScreen({getFilmById, getSimilarFilms, getComments}: FilmsScreenProps): JSX.Element {
  const { id } = useParams() as Params;
  const film = getFilmById(Number(id));
  const similarFilms = getSimilarFilms();

  return (
    <>
      <FullFilmCard film={film} comments={getComments()} />

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>

          <FilmCardsList films={similarFilms}/>
        </section>

        <Footer />
      </div>
    </>
  );
}

export default FilmScreen;

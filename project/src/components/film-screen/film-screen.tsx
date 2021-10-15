import { useParams } from 'react-router-dom';
import type { CommentGet, Film, ParamsWithId } from '../../types/types';
import CatalogFilmsList from '../catalog-films-list/catalog-films-list';
import FullFilmCard from '../full-film-card/full-film-card';
import PageFooter from '../page-footer/page-footer';

type FilmsScreenProps = {
  getFilmById: (id: number) => Film,
  getSimilarFilms: () => Film[],
  getComments: () => CommentGet[],
}
function FilmScreen({getFilmById, getSimilarFilms, getComments}: FilmsScreenProps): JSX.Element {
  const { id } = useParams() as ParamsWithId;
  const film = getFilmById(Number(id));
  const similarFilms = getSimilarFilms();

  return (
    <>
      <FullFilmCard film={film} comments={getComments()} />
      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <CatalogFilmsList films={similarFilms}/>
        </section>
        <PageFooter />
      </div>
    </>
  );
}

export default FilmScreen;

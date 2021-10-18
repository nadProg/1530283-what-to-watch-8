import { useParams } from 'react-router-dom';
import type { CommentGet, Film, ParamsWithId } from '../../types/types';
import CatalogFilmsList from '../catalog-films-list/catalog-films-list';
import Catalog from '../catalog/catalog';
import FullFilmCard from '../full-film-card/full-film-card';
import PageContent from '../page-content/page-content';
import PageFooter from '../page-footer/page-footer';

type FilmsScreenProps = {
  getFilmById: (id: number) => Film,
  getSimilarFilms: (id: number) => Film[],
  getComments: () => CommentGet[],
}

function FilmScreen({getFilmById, getSimilarFilms, getComments}: FilmsScreenProps): JSX.Element {
  const { id } = useParams() as ParamsWithId;
  const film = getFilmById(Number(id));
  const similarFilms = getSimilarFilms(Number(id));

  return (
    <>
      <FullFilmCard film={film} comments={getComments()} />
      <PageContent>
        <Catalog title="More like this" likeThis>
          <CatalogFilmsList films={similarFilms}/>
        </Catalog>
        <PageFooter />
      </PageContent>
    </>
  );
}

export default FilmScreen;

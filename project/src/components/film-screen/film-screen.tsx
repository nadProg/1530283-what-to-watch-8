import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MAX_SIMILAR_FILMS_COUNT } from '../../constants';
import type { CommentGet, Film, ParamsWithId, State } from '../../types/types';
import { isFetchError, isFetchNotReady } from '../../utils/fetched-data';
import { getFilmById, getSimilarFilms } from '../../utils/films';
import CatalogFilmsList from '../catalog-films-list/catalog-films-list';
import Catalog from '../catalog/catalog';
import FullFilmCard from '../full-film-card/full-film-card';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PageContent from '../page-content/page-content';
import PageFooter from '../page-footer/page-footer';

const mapStateToProps = ({films, currentComments}: State) => ({
  fetchedFilms: films,
  fetchedComments: currentComments,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function FilmScreen({fetchedFilms, fetchedComments}: PropsFromRedux): JSX.Element {
  const { id } = useParams() as ParamsWithId;

  // Здесь будет загрузка текущего фильма и комментариев по ID

  if (isFetchNotReady(fetchedFilms) || isFetchNotReady(fetchedComments)) {
    return <LoadingScreen />;
  }

  if (isFetchError(fetchedFilms) || isFetchError(fetchedComments)) {
    return <NotFoundScreen />;
  }

  const films = fetchedFilms.data as Film[];

  const currentFilm = getFilmById(films, Number(id));
  const currentComments = fetchedComments.data as CommentGet[];
  const similarFilms = getSimilarFilms(films, Number(id)).slice(0, MAX_SIMILAR_FILMS_COUNT);

  return (
    <>
      <FullFilmCard film={currentFilm} comments={currentComments} />
      <PageContent>
        <Catalog title="More like this" likeThis>
          <CatalogFilmsList films={similarFilms}/>
        </Catalog>
        <PageFooter />
      </PageContent>
    </>
  );
}

export { FilmScreen };
export default connector(FilmScreen);

import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MAX_SIMILAR_FILMS_COUNT } from '../../constants';
import { getСurrentComments } from '../../store/api-actions';
import type { CommentGet, Film, ParamsWithId, State, ThunkAppDispatch } from '../../types/types';
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

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchCurrentComments(id: number) {
    dispatch(getСurrentComments(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function FilmScreen({fetchedFilms, fetchedComments, fetchCurrentComments}: PropsFromRedux): JSX.Element {
  const { id } = useParams() as ParamsWithId;

  useEffect(() => {
    // Здесь будет загрузка текущего фильма по ID

    fetchCurrentComments(Number(id));
  }, [id]);

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

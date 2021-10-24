import { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { MAX_SIMILAR_FILMS_COUNT } from '../../constants';
import { useIdParam } from '../../hooks/useIdParams';
import { getSimilarFilms, getСurrentComments, getСurrentFilm } from '../../store/api-actions';
import type { CommentGet, Film, State, ThunkAppDispatch } from '../../types/types';
import { isFetchError, isFetchNotReady } from '../../utils/fetched-data';
import CatalogFilmsList from '../catalog-films-list/catalog-films-list';
import Catalog from '../catalog/catalog';
import FullFilmCard from '../full-film-card/full-film-card';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PageContent from '../page-content/page-content';
import PageFooter from '../page-footer/page-footer';

const mapStateToProps = ({currentFilm, currentComments, similarFilms}: State) => ({
  fetchedFilm: currentFilm,
  fetchedComments: currentComments,
  fetchedSimilarFilms: similarFilms,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchCurrentFilm(id: number) {
    dispatch(getСurrentFilm(id));
  },
  fetchCurrentComments(id: number) {
    dispatch(getСurrentComments(id));
  },
  fetchSimilarFilms(id: number) {
    dispatch(getSimilarFilms(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function FilmScreen({fetchedFilm, fetchedComments, fetchedSimilarFilms, fetchCurrentFilm, fetchCurrentComments, fetchSimilarFilms}: PropsFromRedux): JSX.Element {
  const id = useIdParam();

  useEffect(() => {
    if (fetchedFilm.data?.id === id) {
      return;
    }

    fetchCurrentFilm(id);
    fetchCurrentComments(id);
    fetchSimilarFilms(id);
  }, [id]);

  if (isFetchNotReady(fetchedFilm) || isFetchNotReady(fetchedComments) || isFetchNotReady(fetchedSimilarFilms)) {
    return <LoadingScreen />;
  }

  if (isFetchError(fetchedFilm) || isFetchError(fetchedComments) || isFetchNotReady(fetchedSimilarFilms)) {
    return <NotFoundScreen />;
  }

  const currentFilm = fetchedFilm.data as Film;
  const currentComments = fetchedComments.data as CommentGet[];
  const similarFilms = fetchedSimilarFilms.data?.slice(0, MAX_SIMILAR_FILMS_COUNT) as Film[];

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

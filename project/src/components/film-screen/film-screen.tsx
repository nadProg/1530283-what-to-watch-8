import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MAX_SIMILAR_FILMS_COUNT } from '../../constants';
import { useIdParam } from '../../hooks/use-id-param';
import { getCurrentComments } from '../../store/comments/comments-api-actions';
import {
  getCurrentCommentsData,
  getCurrentCommentsStatus
} from '../../store/comments/comments-selectors';
import {
  getCurrentFilm,
  getSimilarFilms
} from '../../store/films/films-api-actions';
import {
  getCurrentFilmData,
  getCurrentFilmStatus,
  getSimilarFilmsData,
  getSimilarFilmsStatus
} from '../../store/films/films-selectors';
import {
  isFetchError,
  isFetchIdle,
  isFetchNotReady
} from '../../utils/fetched-data';
import CatalogFilmsList from '../catalog-films-list/catalog-films-list';
import Catalog from '../catalog/catalog';
import FullFilmCard from '../full-film-card/full-film-card';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import PageContent from '../page-content/page-content';
import PageFooter from '../page-footer/page-footer';

function FilmScreen(): JSX.Element {
  const { id: filmId, error } = useIdParam();

  const film = useSelector(getCurrentFilmData);
  const comments = useSelector(getCurrentCommentsData);
  const similarFilms = useSelector(getSimilarFilmsData);
  const filmStatus = useSelector(getCurrentFilmStatus);
  const commentsStatus = useSelector(getCurrentCommentsStatus);
  const similarFilmsStatus = useSelector(getSimilarFilmsStatus);

  const dispatch = useDispatch();

  const fetchCurrentFilm = (id: number) => {
    dispatch(getCurrentFilm(id));
  };

  const fetchCurrentComments = (id: number) => {
    dispatch(getCurrentComments(id));
  };

  const fetchSimilarFilms = (id: number) => {
    dispatch(getSimilarFilms(id));
  };

  useEffect(() => {
    if (!filmId) {
      return;
    }

    if (film?.id !== filmId) {
      fetchCurrentFilm(filmId);
      fetchSimilarFilms(filmId);
      fetchCurrentComments(filmId);
      return;
    }

    if (isFetchIdle(filmStatus)) {
      fetchCurrentFilm(filmId);
    }

    if (isFetchIdle(commentsStatus)) {
      fetchCurrentComments(filmId);
    }

    if (isFetchIdle(similarFilmsStatus)) {
      fetchSimilarFilms(filmId);
    }
  }, [film?.id, filmId]);

  if (
    error ||
    isFetchError(filmStatus) ||
    isFetchError(commentsStatus) ||
    isFetchError(similarFilmsStatus)
  )
  {
    return <NotFoundScreen />;
  }

  if (
    isFetchNotReady(filmStatus) ||
    isFetchNotReady(commentsStatus) ||
    isFetchNotReady(similarFilmsStatus)
  ) {
    return <LoadingScreen />;
  }

  if (!film || !comments || !similarFilms) {
    return <NotFoundScreen />;
  }

  return (
    <>
      <FullFilmCard film={film} comments={comments} />
      <PageContent>
        <Catalog title="More like this" likeThis>
          <CatalogFilmsList
            films={similarFilms.slice(0, MAX_SIMILAR_FILMS_COUNT)}
          />
        </Catalog>
        <PageFooter />
      </PageContent>
    </>
  );
}

export default FilmScreen;

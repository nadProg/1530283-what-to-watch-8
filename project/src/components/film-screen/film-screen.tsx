import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { AppRoute, FetchStatus, MAX_SIMILAR_FILMS_COUNT } from '../../constants';
import { useIdParam } from '../../hooks/use-id-param';
import { setCurrentCommentsFetchStatus } from '../../store/comments/comments-actions';
import { getCurrentComments } from '../../store/comments/comments-api-actions';
import {
  getCurrentCommentsData,
  getCurrentCommentsStatus
} from '../../store/comments/comments-selectors';
import { setCurrentFilmFetchStatus, setSimilarFilmsFetchStatus } from '../../store/films/films-actions';
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
import { FetchStatusType } from '../../types/types';
import {
  isFetchError,
  isFetchIdle,
  isFetchNotReady,
  isFetchSuccess
} from '../../utils/fetched-data';
import CatalogFilmsList from '../catalog-films-list/catalog-films-list';
import Catalog from '../catalog/catalog';
import FullFilmCard from '../full-film-card/full-film-card';
import LoadingScreen from '../loading-screen/loading-screen';
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

  const [screenStatus, setScreenStatus] = useState<FetchStatusType>(FetchStatus.Idle);
  const screenStatusRef = useRef(screenStatus);

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

  useEffect(() => {
    if (
      isFetchNotReady(filmStatus) ||
      isFetchNotReady(commentsStatus) ||
      isFetchNotReady(similarFilmsStatus)
    ) {
      setScreenStatus(FetchStatus.Loading);
      return;
    }

    if (
      isFetchError(filmStatus) ||
      isFetchError(commentsStatus) ||
      isFetchError(similarFilmsStatus)
    ) {
      setScreenStatus(FetchStatus.Failed);
      return;
    }

    setScreenStatus(FetchStatus.Succeeded);
  }, [filmStatus, commentsStatus, similarFilmsStatus]);

  useEffect(() => {
    screenStatusRef.current = screenStatus;
  }, [screenStatus]);

  useEffect(() => () => {
    if (!isFetchSuccess(screenStatusRef.current)) {
      dispatch(setCurrentFilmFetchStatus(FetchStatus.Idle));
      dispatch(setSimilarFilmsFetchStatus(FetchStatus.Idle));
      dispatch(setCurrentCommentsFetchStatus(FetchStatus.Idle));
    }
  }, []);

  if (error || isFetchError(screenStatus)) {
    return <Redirect to={AppRoute.NotFound()} />;
  }

  if (isFetchNotReady(screenStatus)) {
    return <LoadingScreen />;
  }

  if (!film || !comments || !similarFilms) {
    return <Redirect to={AppRoute.NotFound()} />;
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

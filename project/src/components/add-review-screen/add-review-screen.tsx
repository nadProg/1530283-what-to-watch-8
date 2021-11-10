import { useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useIdParam } from '../../hooks/use-id-param';
import { AppRoute, FetchStatus } from '../../constants';
import { isFetchError, isFetchNotReady, isFetchSuccess } from '../../utils/fetched-data';
import PageHeader from '../page-header/page-header';
import PageTitle from '../page-title/page-title';
import Logo from '../logo/logo';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import FilmCardBackground from '../film-card-background/film-card-background';
import FilmCardPoster from '../film-card-poster/film-card-poster';
import UserBlock from '../user-block/user-block';
import AddReviewForm from '../add-review-form/add-review-form';
import LoadingScreen from '../loading-screen/loading-screen';
import { getCurrentFilm } from '../../store/films/films-api-actions';
import { getCurrentFilmData, getCurrentFilmStatus } from '../../store/films/films-selectors';
import { setCurrentFilmFetchStatus } from '../../store/films/films-actions';

function AddReviewScreen(): JSX.Element {
  const { id: filmId, error } = useIdParam();

  const film = useSelector(getCurrentFilmData);
  const filmStatus = useSelector(getCurrentFilmStatus);
  const filmStatusRef = useRef(filmStatus);

  const dispatch = useDispatch();

  const fetchCurrentFilm = (id: number) => {
    dispatch(getCurrentFilm(id));
  };

  useEffect(() => {
    if (!filmId || film?.id === filmId) {
      return;
    }

    fetchCurrentFilm(filmId);
  }, [film?.id, filmId]);

  useEffect(() => {
    filmStatusRef.current = filmStatus;
  }, [filmStatus]);

  useEffect(() => () => {
    if (!isFetchSuccess(filmStatusRef.current)) {
      dispatch(setCurrentFilmFetchStatus(FetchStatus.Idle));
    }
  }, []);

  if (error || isFetchError(filmStatus)) {
    return <Redirect to={AppRoute.NotFound()} />;
  }

  if (isFetchNotReady(filmStatus)) {
    return <LoadingScreen />;
  }

  if (!film) {
    return <Redirect to={AppRoute.NotFound()} />;
  }

  return (
    <section className="film-card film-card--full" style={{backgroundColor: film.backgroundColor}}>
      <div className="film-card__header">
        <FilmCardBackground src={film.backgroundImage} alt={film.name} />
        <PageTitle hidden>WTW</PageTitle>
        <PageHeader>
          <Logo />
          <Breadcrumbs film={film} />
          <UserBlock />
        </PageHeader>
        <FilmCardPoster src={film.posterImage} alt={`${film.name} poster`} small />
      </div>
      <AddReviewForm />
    </section>
  );
}

export default AddReviewScreen;

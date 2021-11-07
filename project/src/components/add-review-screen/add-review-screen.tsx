import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useIdParam } from '../../hooks/use-id-param';
import { isFetchError, isFetchNotReady } from '../../utils/fetched-data';
import PageHeader from '../page-header/page-header';
import PageTitle from '../page-title/page-title';
import Logo from '../logo/logo';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import FilmCardBackground from '../film-card-background/film-card-background';
import FilmCardPoster from '../film-card-poster/film-card-poster';
import UserBlock from '../user-block/user-block';
import AddReviewForm from '../add-review-form/add-review-form';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import LoadingScreen from '../loading-screen/loading-screen';
import { getСurrentFilm } from '../../store/films/films-api-actions';
import { getCurrentFilmData, getCurrentFilmStatus } from '../../store/films/films-selectors';

function AddReviewScreen(): JSX.Element {
  const { id: filmId, error } = useIdParam();

  const film = useSelector(getCurrentFilmData);
  const filmStatus = useSelector(getCurrentFilmStatus);

  const dispatch = useDispatch();

  const fetchCurrentFilm = (id: number) => {
    dispatch(getСurrentFilm(id));
  };

  useEffect(() => {
    if (!filmId || film?.id === filmId) {
      return;
    }

    fetchCurrentFilm(filmId);
  }, [film?.id, filmId]);


  if (isFetchNotReady(filmStatus)) {
    return <LoadingScreen />;
  }

  if (isFetchError(filmStatus) || !film || error) {
    return <NotFoundScreen />;
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

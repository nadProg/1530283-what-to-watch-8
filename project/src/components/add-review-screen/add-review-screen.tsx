import { useParams } from 'react-router-dom';
import type { Film, ParamsWithId, State } from '../../types/types';
import FilmCardBackground from '../film-card-background/film-card-background';
import FilmCardPoster from '../film-card-poster/film-card-poster';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import AddReviewForm from '../add-review-form/add-review-form';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import PageHeader from '../page-header/page-header';
import PageTitle from '../page-title/page-title';
import { connect, ConnectedProps } from 'react-redux';
import { isFetchError, isFetchNotReady } from '../../utils/fetched-data';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { getFilmById } from '../../utils/films';

const mapStateToProps = ({films}: State) => ({
  fetchedFilms: films,
});

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function AddReviewScreen({fetchedFilms}: PropsFromRedux): JSX.Element {
  const { id } = useParams() as ParamsWithId;

  // Здесь будет загрузка текущего фильма по ID

  if (isFetchNotReady(fetchedFilms)) {
    return <LoadingScreen />;
  }

  if (isFetchError(fetchedFilms)) {
    return <NotFoundScreen />;
  }

  const films = fetchedFilms.data as Film[];
  const currentFilm = getFilmById(films, Number(id));

  return (
    <section className="film-card film-card--full" style={{backgroundColor: currentFilm.backgroundColor}}>
      <div className="film-card__header">
        <FilmCardBackground src={currentFilm.backgroundImage} alt={currentFilm.name} />
        <PageTitle hidden>WTW</PageTitle>
        <PageHeader>
          <Logo />
          <Breadcrumbs film={currentFilm} />
          <UserBlock />
        </PageHeader>
        <FilmCardPoster src={currentFilm.posterImage} alt={`${currentFilm.name} poster`} small />
      </div>
      <AddReviewForm />
    </section>
  );
}

export { AddReviewScreen };
export default connector(AddReviewScreen);

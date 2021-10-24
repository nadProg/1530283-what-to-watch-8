import type { Film, State, ThunkAppDispatch } from '../../types/types';
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
import { useEffect } from 'react';
import { getСurrentFilm } from '../../store/api-actions';
import { useIdParam } from '../../hooks/useIdParams';

const mapStateToProps = ({currentFilm}: State) => ({
  fetchedFilm: currentFilm,
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchCurrentFilm(id: number) {
    dispatch(getСurrentFilm(id));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function AddReviewScreen({fetchedFilm, fetchCurrentFilm}: PropsFromRedux): JSX.Element {
  const id = useIdParam();

  useEffect(() => {
    fetchCurrentFilm(id);
  }, [id]);


  if (isFetchNotReady(fetchedFilm)) {
    return <LoadingScreen />;
  }

  if (isFetchError(fetchedFilm)) {
    return <NotFoundScreen />;
  }

  const currentFilm = fetchedFilm.data as Film;

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

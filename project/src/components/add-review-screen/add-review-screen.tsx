import { useParams } from 'react-router-dom';
import FilmCardBackground from '../film-card-background/film-card-background';
import FilmCardPoster from '../film-card-poster/film-card-poster';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import AddReviewForm from '../add-review-form/add-review-form';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import type { Film, ParamsWithId } from '../../types/types';
import PageTitle from '../page-title/page-title';

export type AddReviewScreenProps = {
  getFilmById: (id: number) => Film,
}

function AddReviewScreen({getFilmById}: AddReviewScreenProps): JSX.Element {
  const { id } = useParams() as ParamsWithId;
  const film = getFilmById(Number(id));

  return (
    <section className="film-card film-card--full" style={{backgroundColor: film.backgroundColor}}>
      <div className="film-card__header">
        <FilmCardBackground src={film.backgroundImage} alt={film.name} />
        <PageTitle hidden>WTW</PageTitle>
        <header className="page-header">
          <Logo />
          <Breadcrumbs film={film} />
          <UserBlock />
        </header>
        <FilmCardPoster src={film.posterImage} alt={`${film.name} poster`} small />
      </div>
      <AddReviewForm />
    </section>
  );
}

export default AddReviewScreen;

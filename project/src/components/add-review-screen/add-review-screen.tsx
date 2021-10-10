import { useParams } from 'react-router-dom';
import FilmCardBackground from '../ui/film-card-background/film-card-background';
import FilmCardPoster from '../ui/film-card-poster/film-card-poster';
import Logo from '../ui/logo/logo';
import UserBlock from '../user-block/user-block';
import AddReviewForm from '../add-review-form/add-review-form';
import Breadcrumbs from '../breadcrumbs/breadcrumbs';
import type { Film, Params } from '../../types/types';

export type AddReviewScreenProps = {
  getFilmById: (id: number) => Film,
}

function AddReviewScreen({getFilmById}: AddReviewScreenProps): JSX.Element {
  const { id } = useParams() as Params;
  const film = getFilmById(Number(id));

  return (
    <section className="film-card film-card--full" style={{backgroundColor: film.backgroundColor}}>
      <div className="film-card__header">
        <FilmCardBackground src={film.backgroundImage} alt={film.name} />

        <h1 className="visually-hidden">WTW</h1>

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

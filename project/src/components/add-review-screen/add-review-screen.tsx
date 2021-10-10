import { Link, useParams } from 'react-router-dom';
import Logo from '../logo/logo';
import UserBlock from '../user-block/user-block';
import ReviewForm from '../review-form/review-form';
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
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />
          <Breadcrumbs film={film} />
          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327" />
        </div>
      </div>

      <div className="add-review">
        <ReviewForm />
      </div>

    </section>
  );
}

export default AddReviewScreen;

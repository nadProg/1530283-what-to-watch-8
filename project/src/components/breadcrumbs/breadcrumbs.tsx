import { Link } from 'react-router-dom';
import type { Film } from '../../types/types';
import { AppRoute } from '../../constants';

type BreadcrumbsProps = {
  film: Film
}

function Breadcrumbs({film}: BreadcrumbsProps): JSX.Element {
  return (
    <nav className="breadcrumbs">
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <Link to={AppRoute.Film(film.id)} className="breadcrumbs__link">{film.name}</Link>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link">Add review</a>
        </li>
      </ul>
    </nav>
  );
}

export default Breadcrumbs;

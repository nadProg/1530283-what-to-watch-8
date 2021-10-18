import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { NavigationItem } from '../../constants';

const BASE_CLASSNAME = 'film-nav';
const BASE_ITEM_CLASSNAME = 'film-nav__item';

type FilmCardNavigationProps = {
  className?: string;
}

function FilmCardNavigation({className}: FilmCardNavigationProps): JSX.Element {
  const location = useLocation();
  const fullClassname = classNames(BASE_CLASSNAME, className);

  return (
    <nav className={fullClassname}>
      <ul className="film-nav__list">
        {
          Object.values(NavigationItem).map((navigationItem) => {
            const fullItemClassname = classNames(BASE_ITEM_CLASSNAME, { [`${BASE_ITEM_CLASSNAME}--active`]: location.hash.slice(1) === navigationItem });
            const path = `${location.pathname}#${navigationItem}`;
            const caption = `${navigationItem[0].toUpperCase()}${navigationItem.slice(1)}`;

            return (
              <li key={navigationItem} className={fullItemClassname}>
                <Link to={path} className="film-nav__link">{caption}</Link>
              </li>
            );
          })
        }
      </ul>
    </nav>
  );
}

export default FilmCardNavigation;

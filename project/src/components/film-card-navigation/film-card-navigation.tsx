import { Link, useLocation } from 'react-router-dom';
import { NavigationItem } from '../../constants';
import { joinStrings } from '../../utils/common';

const BASE_CLASSNAME = 'film-nav';
const BASE_ITEM_CLASSNAME = 'film-nav__item';

type FilmCardNavigationProps = {
  className?: string;
}

function FilmCardNavigation({className}: FilmCardNavigationProps): JSX.Element {
  const fullClassname = className ? joinStrings(BASE_CLASSNAME, className) : BASE_CLASSNAME;
  const location = useLocation();

  return (
    <nav className={fullClassname}>
      <ul className="film-nav__list">
        {
          Object.values(NavigationItem).map((navigationItem) => {
            const activeItemClassname = location.hash.slice(1) === navigationItem ? `${BASE_ITEM_CLASSNAME}--active` : '';
            const fullItemClassname = joinStrings(BASE_ITEM_CLASSNAME, activeItemClassname);
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

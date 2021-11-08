import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import upperFirst from 'lodash/upperFirst';
import { FilmCardTab } from '../../constants';

const BASE_CLASS_NAME = 'film-nav';
const BASE_TAB_CLASS_NAME = 'film-nav__item';

type FilmCardTabsProps = {
  className?: string;
}

function FilmCardTabs({className}: FilmCardTabsProps): JSX.Element {
  const location = useLocation();
  const fullClassName = classNames(BASE_CLASS_NAME, className);

  return (
    <nav className={fullClassName} data-testid="film-card-navigation">
      <ul className="film-nav__list">
        {
          Object.values(FilmCardTab).map((tab) => {
            const fullItemClassName = classNames(BASE_TAB_CLASS_NAME, { [`${BASE_TAB_CLASS_NAME}--active`]: location.hash.slice(1) === tab });
            const path = `${location.pathname}#${tab}`;

            return (
              <li key={tab} className={fullItemClassName}>
                <Link to={path} className="film-nav__link">{upperFirst(tab)}</Link>
              </li>
            );
          })
        }
      </ul>
    </nav>
  );
}

export default FilmCardTabs;

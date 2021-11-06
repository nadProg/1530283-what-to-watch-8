import { ReactNode } from 'react';
import classNames from 'classnames';

const BASE_CLASSNAME = 'catalog';
const BASE_TITLE_CLASSNAME = 'catalog__title';

type CatalogProps = {
  title?: string,
  hiddenTitle?: string,
  likeThis?: boolean,
  children: ReactNode,
}

function Catalog({title, hiddenTitle, likeThis, children}: CatalogProps): JSX.Element {
  const fullClassName = classNames(BASE_CLASSNAME, { [`${BASE_CLASSNAME}--like-this`]: likeThis });
  const fullTitleClassName = classNames(BASE_TITLE_CLASSNAME, { 'visually-hidden': !title });

  return (
    <section className={fullClassName} data-testid="catalog-container">
      <h2 className={fullTitleClassName} data-testid="catalog-title">{hiddenTitle || title}</h2>
      {children}
    </section>
  );
}

export default Catalog;

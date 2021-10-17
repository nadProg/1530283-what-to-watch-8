import { ReactNode } from 'react';
import { joinStrings } from '../../utils/common';

const BASE_CLASSNAME = 'catalog';
const BASE_TITLE_CLASSNAME = 'catalog__title';

type CatalogProps = {
  title?: string,
  hiddenTitle?: string,
  likeThis?: boolean,
  children: ReactNode,
}

function Catalog({title, hiddenTitle, likeThis, children}: CatalogProps): JSX.Element {
  const likeThisClassName = likeThis ? `${BASE_CLASSNAME}--like-this` : '';
  const visuallyHidden = !title ? 'visually-hidden' : '';

  const fullClassName = joinStrings(BASE_CLASSNAME, likeThisClassName);
  const fullTitleClassName = joinStrings(BASE_TITLE_CLASSNAME, visuallyHidden);

  return (
    <section className={fullClassName}>
      <h2 className={fullTitleClassName}>{hiddenTitle || title}</h2>
      {children}
    </section>
  );
}

export default Catalog;

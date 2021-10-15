import { ReactNode } from 'react';

const BASE_CLASSNAME = 'catalog';

type CatalogProps = {
  title?: string,
  hiddenTitle?: string,
  likeThis?: boolean,
  children: ReactNode,
}

function Catalog({title, hiddenTitle, likeThis, children}: CatalogProps): JSX.Element {
  const visuallyHidden = !title ? 'visually-hidden' : '';
  const likeThisClassName = likeThis ? `${BASE_CLASSNAME}--like-this` : '';
  const fullClassName = `${BASE_CLASSNAME} ${likeThisClassName}`.trim();
  const fullTitleClassName = `catalog__title ${visuallyHidden}`.trim();

  return (
    <section className={fullClassName}>
      <h2 className={fullTitleClassName}>{hiddenTitle || title}</h2>
      {children}
    </section>
  );
}

export default Catalog;

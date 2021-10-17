import type { Film } from '../../types/types';
import PageFooter from '../page-footer/page-footer';
import PromoFilmCard from '../promo-film-card/promo-film-card';
import CatalogGenresList from '../catalog-genres-list/catalog-genres-list';
import CatalogFilmsList from '../catalog-films-list/catalog-films-list';
import CatalogMoreButton from '../catalog-more-button/catalog-more-button';
import { getGenresList, ALL_GENRES } from '../../utils/genres';
import { useState } from 'react';
import Catalog from '../catalog/catalog';
import PageContent from '../page-content/page-content';

type MainScreenProps = {
  promoFilm: Film,
  films: Film[],
}

function MainScreen({promoFilm, films}: MainScreenProps): JSX.Element {
  const [ activeGenre, setActiveGenre ] = useState(ALL_GENRES);
  const genres = getGenresList(films);

  return (
    <>
      <PromoFilmCard film={promoFilm} />
      <PageContent>
        <Catalog hiddenTitle="Catalog">
          <CatalogGenresList genres={genres} activeGenre={activeGenre} setActiveGenre={setActiveGenre} />
          <CatalogFilmsList films={films} />
          <CatalogMoreButton />
        </Catalog>
        <PageFooter />
      </PageContent>
    </>
  );
}

export default MainScreen;

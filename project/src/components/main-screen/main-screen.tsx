import { Dispatch, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import type { State, Action } from '../../types/types';
import PageFooter from '../page-footer/page-footer';
import PromoFilmCard from '../promo-film-card/promo-film-card';
import CatalogGenresList from '../catalog-genres-list/catalog-genres-list';
import CatalogFilmsList from '../catalog-films-list/catalog-films-list';
import CatalogMoreButton from '../catalog-more-button/catalog-more-button';
import { getGenresList, ALL_GENRES } from '../../utils/genres';
import Catalog from '../catalog/catalog';
import PageContent from '../page-content/page-content';
import { setFilter } from '../../store/action';

const mapStateToProps = (state: State) => ({
  promoFilm: state.films[0],
  films: state.films,
  filter: state.filter,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onFilterChange(filter: string) {
    dispatch(setFilter(filter));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type MainScreenProps = ConnectedProps<typeof connector>;

function MainScreen({promoFilm, films, filter, onFilterChange}: MainScreenProps): JSX.Element {
  const [ catalogFilms, setCatalogFilms ] = useState(films);
  const genres = getGenresList(films);

  useEffect(() => {
    if (!filter || filter === ALL_GENRES) {
      setCatalogFilms(films);
      return;
    }

    const filteredFilms = films.filter((film) => film.genre === filter);
    setCatalogFilms(filteredFilms);
  }, [filter, films]);

  return (
    <>
      <PromoFilmCard film={promoFilm} />
      <PageContent>
        <Catalog hiddenTitle="Catalog">
          <CatalogGenresList genres={genres} activeGenre={filter} setActiveGenre={onFilterChange} />
          <CatalogFilmsList films={catalogFilms} />
          <CatalogMoreButton />
        </Catalog>
        <PageFooter />
      </PageContent>
    </>
  );
}

export { MainScreen };
export default connector(MainScreen);

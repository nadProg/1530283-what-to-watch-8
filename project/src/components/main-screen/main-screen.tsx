import { Dispatch, useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import type { State, Action } from '../../types/types';
import { FILMS_COUNT_STEP } from '../../constants';
import PageFooter from '../page-footer/page-footer';
import PromoFilmCard from '../promo-film-card/promo-film-card';
import CatalogGenresList from '../catalog-genres-list/catalog-genres-list';
import CatalogFilmsList from '../catalog-films-list/catalog-films-list';
import CatalogMoreButton from '../catalog-more-button/catalog-more-button';
import Catalog from '../catalog/catalog';
import PageContent from '../page-content/page-content';
import { setFilter } from '../../store/action';
import { getFilteredFilms, getGenres } from '../../store/selector';

const mapStateToProps = (state: State) => ({
  promoFilm: state.films[0],
  genres: getGenres(state),
  filteredFilms: getFilteredFilms(state),
  filter: state.filter,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  onFilterChange(filter: string) {
    dispatch(setFilter(filter));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type MainScreenProps = ConnectedProps<typeof connector>;

function MainScreen({promoFilm, genres, filteredFilms, filter, onFilterChange}: MainScreenProps): JSX.Element {
  const [ filmsCount, setFilmsCount ] = useState(FILMS_COUNT_STEP);
  const [ catalogFilms, setCatalogFilms ] = useState(filteredFilms);
  const [ isMoreButtonVisible, setMoreButtonVisibility ] = useState(false);

  const handleMoreButtonClick = () => {
    setFilmsCount(filmsCount + FILMS_COUNT_STEP);
  };

  useEffect(() => {
    setCatalogFilms(filteredFilms.slice(0, filmsCount));
    setMoreButtonVisibility(filteredFilms.length > filmsCount);
  }, [filmsCount, filteredFilms]);

  useEffect(() => {
    setFilmsCount(FILMS_COUNT_STEP);
  }, [filter]);

  return (
    <>
      <PromoFilmCard film={promoFilm} />
      <PageContent>
        <Catalog hiddenTitle="Catalog">
          <CatalogGenresList genres={genres} activeGenre={filter} setActiveGenre={onFilterChange} />
          <CatalogFilmsList films={catalogFilms} />
          { isMoreButtonVisible && <CatalogMoreButton onClick={handleMoreButtonClick} /> }
        </Catalog>
        <PageFooter />
      </PageContent>
    </>
  );
}

export { MainScreen };
export default connector(MainScreen);

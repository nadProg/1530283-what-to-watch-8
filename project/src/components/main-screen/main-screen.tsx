import { connect, ConnectedProps } from 'react-redux';
import type { Film, State, ThunkAppDispatch } from '../../types/types';
import { useEffect, useState } from 'react';
import { CATALOG_INITIAL_PAGE, CATALOG_PAGE_SIZE, FetchStatus } from '../../constants';
import PageFooter from '../page-footer/page-footer';
import PromoFilmCard from '../promo-film-card/promo-film-card';
import CatalogGenresList from '../catalog-genres-list/catalog-genres-list';
import CatalogFilmsList from '../catalog-films-list/catalog-films-list';
import CatalogMoreButton from '../catalog-more-button/catalog-more-button';
import Catalog from '../catalog/catalog';
import PageContent from '../page-content/page-content';
import { getFilteredFilms, getGenres } from '../../store/selectors';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { isFetchError, isFetchIdle, isFetchNotReady } from '../../utils/fetched-data';
import { getAllFilms, getPromoFilm } from '../../store/films/films-api-actions';
import { setFilter } from '../../store/filter/filter-actions';
import { setAllFilmsFetchStatus } from '../../store/films/films-actions';

const mapStateToProps = (state: State) => ({
  fetchedAllFilms: state.films.allFilms,
  fetchedPromoFilm: state.films.promoFilm,
  filter: state.filter,
  genres: getGenres(state),
  filteredFilms: getFilteredFilms(state),
});

const mapDispatchToProps = (dispatch: ThunkAppDispatch) => ({
  fetchAllFilms() {
    dispatch(getAllFilms());
  },
  fetchPromoFilm() {
    dispatch(getPromoFilm());
  },
  onFilterChange(filter: string) {
    dispatch(setFilter(filter));
  },
  resetAllFilmsFetchStatus() {
    dispatch(setAllFilmsFetchStatus(FetchStatus.Idle));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type MainScreenProps = ConnectedProps<typeof connector>;

function MainScreen({fetchedAllFilms: fetchedFilms, fetchedPromoFilm, genres, filteredFilms, filter, onFilterChange, fetchAllFilms, fetchPromoFilm}: MainScreenProps): JSX.Element {
  const [ currentPage, setCurrentPage ] = useState(CATALOG_INITIAL_PAGE);

  useEffect(() => {
    if (isFetchIdle(fetchedFilms)) {
      fetchAllFilms();
    }

    if (isFetchIdle(fetchedPromoFilm)) {
      fetchPromoFilm();
    }
  }, []);

  useEffect(() => {
    setCurrentPage(CATALOG_INITIAL_PAGE);
  }, [filter]);

  if (isFetchNotReady(fetchedFilms) || isFetchNotReady(fetchedPromoFilm)) {
    return <LoadingScreen />;
  }

  if (isFetchError(fetchedFilms) || isFetchError(fetchedPromoFilm)) {
    return <NotFoundScreen />;
  }

  const promoFilm = fetchedPromoFilm.data as Film;
  const catalogFilms = filteredFilms.slice(0, currentPage * CATALOG_PAGE_SIZE);
  const isMoreButtonVisible = filteredFilms.length > catalogFilms.length;

  const handleMoreButtonClick = () => {
    setCurrentPage((prevCount) => prevCount + 1);
  };

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

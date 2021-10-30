import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CATALOG_INITIAL_PAGE, CATALOG_PAGE_SIZE } from '../../constants';
import PromoFilmCard from '../promo-film-card/promo-film-card';
import PageContent from '../page-content/page-content';
import Catalog from '../catalog/catalog';
import CatalogGenresList from '../catalog-genres-list/catalog-genres-list';
import CatalogFilmsList from '../catalog-films-list/catalog-films-list';
import CatalogMoreButton from '../catalog-more-button/catalog-more-button';
import PageFooter from '../page-footer/page-footer';
import LoadingScreen from '../loading-screen/loading-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import { getGenres } from '../../store/genres/genres-selectors';
import { setFilter } from '../../store/filter/filter-actions';
import { getFilter } from '../../store/filter/filter-selectors';
import { getAllFilms, getPromoFilm } from '../../store/films/films-api-actions';
import { isFetchError, isFetchIdle, isFetchNotReady } from '../../utils/fetched-data';
import { getAllFilmsStatus, getFilteredFilms, getPromoFilmData, getPromoFilmStatus } from '../../store/films/films-selectors';

function MainScreen(): JSX.Element {
  const allFilmsStatus = useSelector(getAllFilmsStatus);
  const promoFilmsStatus = useSelector(getPromoFilmStatus);
  const filter = useSelector(getFilter);
  const genres = useSelector(getGenres);
  const filteredFilms = useSelector(getFilteredFilms);
  const promoFilm = useSelector(getPromoFilmData);

  const dispatch = useDispatch();

  const fetchAllFilms = () => {
    dispatch(getAllFilms());
  };

  const fetchPromoFilm = () => {
    dispatch(getPromoFilm());
  };

  const onFilterChange = useCallback((newFilter: string) => {
    dispatch(setFilter(newFilter));
  }, [dispatch]);

  const handleMoreButtonClick = useCallback(() => {
    setCurrentPage((prevCount) => prevCount + 1);
  }, []);

  const [ currentPage, setCurrentPage ] = useState(CATALOG_INITIAL_PAGE);

  useEffect(() => {
    if (isFetchIdle(allFilmsStatus)) {
      fetchAllFilms();
    }

    if (isFetchIdle(promoFilmsStatus)) {
      fetchPromoFilm();
    }
  }, []);

  useEffect(() => {
    setCurrentPage(CATALOG_INITIAL_PAGE);
  }, [filter]);

  if (isFetchNotReady(allFilmsStatus) || isFetchNotReady(promoFilmsStatus)) {
    return <LoadingScreen />;
  }

  if (isFetchError(allFilmsStatus) || isFetchError(promoFilmsStatus) || !promoFilm) {
    return <NotFoundScreen />;
  }

  const catalogFilms = filteredFilms.slice(0, currentPage * CATALOG_PAGE_SIZE);
  const isMoreButtonVisible = filteredFilms.length > catalogFilms.length;

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

export default MainScreen;

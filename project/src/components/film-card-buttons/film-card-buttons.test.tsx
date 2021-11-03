import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { AuthorizationStatus } from '../../constants';
import { State } from '../../types/types';
import FilmCardButtons from './film-card-buttons';

const mockId = datatype.number();

const history = createMemoryHistory();

const mockStore = configureMockStore<State>();

const userStore = mockStore({
  authorization: {
    status: AuthorizationStatus.Auth,
  },
});

const guestStore = mockStore({
  authorization: {
    status: AuthorizationStatus.NotAuth,
  },
});

describe('Component: FilmCardButtons', () => {
  it('should render correctly with isFilmFavorite', () => {
    render(
      <Provider store={userStore}>
        <Router history={history}>
          <FilmCardButtons filmId={mockId} isFilmFavorite />
        </Router>,
      </Provider>,
    );

    expect(screen.queryByText(/Play/i)).toBeInTheDocument();
    expect(screen.queryByText(/My list/i)).toBeInTheDocument();
    expect(screen.queryByText(/Add Review/i)).not.toBeInTheDocument();
  });

  it('should render correctly with isFilmFavorite false', () => {
    render(
      <Provider store={userStore}>
        <Router history={history}>
          <FilmCardButtons filmId={mockId} isFilmFavorite={false} />
        </Router>,
      </Provider>,
    );

    expect(screen.queryByText(/Play/i)).toBeInTheDocument();
    expect(screen.queryByText(/My list/i)).toBeInTheDocument();
    expect(screen.queryByText(/Add Review/i)).not.toBeInTheDocument();
  });

  it('should render correctly with isFilmFavorite false and withAddReview', () => {
    render(
      <Provider store={userStore}>
        <Router history={history}>
          <FilmCardButtons filmId={mockId} isFilmFavorite={false} withAddReview />
        </Router>,
      </Provider>,
    );

    expect(screen.queryByText(/Play/i)).toBeInTheDocument();
    expect(screen.queryByText(/My list/i)).toBeInTheDocument();
    expect(screen.queryByText(/Add Review/i)).toBeInTheDocument();
  });

  it('should render correctly with isFilmFavorite and withAddReview', () => {
    render(
      <Provider store={userStore}>
        <Router history={history}>
          <FilmCardButtons filmId={mockId} isFilmFavorite withAddReview />
        </Router>,
      </Provider>,
    );

    expect(screen.queryByText(/Play/i)).toBeInTheDocument();
    expect(screen.queryByText(/My list/i)).toBeInTheDocument();
    expect(screen.queryByText(/Add Review/i)).toBeInTheDocument();
  });

  it('should render correctly with isFilmFavorite and withAddReview when user is not authorized', () => {
    render(
      <Provider store={guestStore}>
        <Router history={history}>
          <FilmCardButtons filmId={mockId} isFilmFavorite withAddReview />
        </Router>,
      </Provider>,
    );

    expect(screen.queryByText(/Play/i)).toBeInTheDocument();
    expect(screen.queryByText(/My list/i)).toBeInTheDocument();
    expect(screen.queryByText(/Add Review/i)).not.toBeInTheDocument();
  });
});

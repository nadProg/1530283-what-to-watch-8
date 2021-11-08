import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Route, Router } from 'react-router-dom';
import { AppRoute } from '../../constants';
import { createMockFilm } from '../../mocks/films';
import Breadcrumbs from './breadcrumbs';

const history = createMemoryHistory();
const mockFilm = createMockFilm();

describe('Component: Breadcrumbs', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <Breadcrumbs film={mockFilm} />
      </Router>,
    );

    expect(screen.queryByTestId('film-link')).toHaveTextContent(mockFilm.name);
  });

  it('should redirect to film screen page', () => {
    history.push(AppRoute.AddReview());

    render(
      <Router history={history}>
        <Route path={AppRoute.Film()} exact>
          <div data-testid="film-screen-page" />
        </Route>
        <Route path={AppRoute.AddReview()} exact>
          <Breadcrumbs film={mockFilm} />
        </Route>
      </Router>,
    );

    userEvent.click(screen.getByTestId('film-link'));

    expect(screen.queryByTestId('film-screen-page')).toBeInTheDocument();
  });
});

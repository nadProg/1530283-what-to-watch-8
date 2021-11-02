import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import PageFooter from './page-footer';

const history = createMemoryHistory();

describe('Component: PageFooter', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <PageFooter />
      </Router>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.queryByText(/© 2019 What to watch Ltd./i)).toBeInTheDocument();
  });
});

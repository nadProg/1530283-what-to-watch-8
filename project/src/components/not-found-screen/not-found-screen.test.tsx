import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import NotFoundScreen from './not-found-screen';

const history = createMemoryHistory();

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    render(
      <Router history={history}>
        <NotFoundScreen />
      </Router>,
    );

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.queryByText(/This page does not exist/i)).toBeInTheDocument();
    expect(screen.queryByText(/Go to main page/i)).toBeInTheDocument();
  });
});

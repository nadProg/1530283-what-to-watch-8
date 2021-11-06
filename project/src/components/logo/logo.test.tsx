import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Logo from './logo';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly with no props', () => {
    render(
      <Router history={history}>
        <Logo />
      </Router>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByTestId('logo-link')).not.toHaveClass('logo__link--light');
  });

  it('should render correctly with footer props', () => {
    render(
      <Router history={history}>
        <Logo footer />
      </Router>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByTestId('logo-link')).toHaveClass('logo__link--light');
  });
});

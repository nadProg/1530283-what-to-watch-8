import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Logo from './logo';

const history = createMemoryHistory();

describe('Component: Logo', () => {
  it('should render correctly with no props', () => {
    const { container } = render(
      <Router history={history}>
        <Logo />
      </Router>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(container.querySelector('.logo__link--light')).toBeFalsy();
  });

  it('should render correctly with footer props', () => {
    const { container } = render(
      <Router history={history}>
        <Logo footer />
      </Router>,
    );

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(container.querySelector('.logo__link--light')).toBeTruthy();
  });
});

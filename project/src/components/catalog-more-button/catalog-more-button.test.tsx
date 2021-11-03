import { render, screen } from '@testing-library/react';
import CatalogMoreButton from './catalog-more-button';

const onClick = jest.fn();

describe('Component: CatalogMoreButton', () => {
  it('should render correctly', () => {
    render(<CatalogMoreButton onClick={onClick} />);

    expect(screen.queryByText(/Show More/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});

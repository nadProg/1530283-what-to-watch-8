import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CatalogMoreButton from './catalog-more-button';

const onClick = jest.fn();

describe('Component: CatalogMoreButton', () => {
  it('should render correctly', () => {
    render(<CatalogMoreButton onClick={onClick} />);

    expect(screen.queryByText(/Show More/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should handle click correctly', () => {
    render(<CatalogMoreButton onClick={onClick} />);

    userEvent.click(screen.getByText(/Show More/i));
    userEvent.click(screen.getByText(/Show More/i));

    expect(onClick).toHaveBeenCalledTimes(2);
  });
});

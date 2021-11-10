import { lorem } from 'faker';
import { render, screen } from '@testing-library/react';
import Catalog from './catalog';

describe('Component: Catalog', () => {
  it('should render correctly with no props', () => {
    render(
      <Catalog>
        <div data-testid="children" />
      </Catalog>,
    );

    expect(screen.queryByTestId('children')).toBeInTheDocument();

    expect(screen.queryByTestId('catalog-container')).not.toHaveClass('catalog--like-this');
  });

  it('should render correctly with title prop', () => {
    const mockTitle = lorem.words();

    render(
      <Catalog title={mockTitle}>
        <div data-testid="children" />
      </Catalog>,
    );

    expect(screen.queryByTestId('children')).toBeInTheDocument();
    expect(screen.queryByTestId('catalog-title')).toHaveTextContent(mockTitle);

    expect(screen.queryByTestId('catalog-container')).not.toHaveClass('catalog--like-this');

    expect(screen.queryByTestId('catalog-title')).toHaveClass('catalog__title');
  });

  it('should render correctly with hiddenTitle prop', () => {
    const mockHiddenTitle = lorem.words();

    render(
      <Catalog hiddenTitle={mockHiddenTitle}>
        <div data-testid="children" />
      </Catalog>,
    );

    expect(screen.queryByTestId('children')).toBeInTheDocument();
    expect(screen.queryByTestId('catalog-title')).toHaveTextContent(mockHiddenTitle);

    expect(screen.queryByTestId('catalog-title')).toHaveClass('catalog__title');
    expect(screen.queryByTestId('catalog-title')).toHaveClass('visually-hidden');

    expect(screen.queryByTestId('catalog-container')).not.toHaveClass('catalog--like-this');
  });


  it('should render correctly with likeThis prop', () => {
    render(
      <Catalog likeThis>
        <div data-testid="children" />
      </Catalog>,
    );

    expect(screen.queryByTestId('children')).toBeInTheDocument();

    expect(screen.queryByTestId('catalog-container')).toHaveClass('catalog--like-this');
  });
});

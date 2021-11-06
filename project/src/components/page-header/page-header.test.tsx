import { lorem } from 'faker';
import { render, screen } from '@testing-library/react';
import PageHeader from './page-header';

const mockClassName = lorem.word();

describe('Component: PageHeader', () => {
  it('should render correctly with no props', () => {
    render(
      <PageHeader>
        <div data-testid="children" />
      </PageHeader>,
    );

    expect(screen.queryByTestId('children')).toBeInTheDocument();
  });

  it('should render correctly with className props', () => {
    render(
      <PageHeader className={mockClassName} >
        <div data-testid="children" />
      </PageHeader>,
    );

    expect(screen.queryByTestId('children')).toBeInTheDocument();
    expect(screen.queryByTestId('page-header')).toHaveClass(mockClassName);
  });
});

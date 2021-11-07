import { lorem } from 'faker';
import { render, screen } from '@testing-library/react';
import PageTitle from './page-title';

const mockClassName = lorem.word();

describe('Component: PageTitle', () => {
  it('should render correctly with no props', () => {
    render(
      <PageTitle>
        <div data-testid="children" />
      </PageTitle>,
    );

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.queryByTestId('children')).toBeInTheDocument();

    expect(screen.queryByTestId('page-title')).toHaveClass('page-title');

    expect(screen.queryByTestId('page-title')).not.toHaveClass('visually-hidden');
  });

  it('should render correctly with className props', () => {
    render(
      <PageTitle className={mockClassName} >
        <div data-testid="children" />
      </PageTitle>,
    );

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.queryByTestId('children')).toBeInTheDocument();

    expect(screen.queryByTestId('page-title')).toHaveClass('page-title');
    expect(screen.queryByTestId('page-title')).toHaveClass(mockClassName);

    expect(screen.queryByTestId('page-title')).not.toHaveClass('visually-hidden');
  });

  it('should render correctly with hidden props', () => {
    render(
      <PageTitle hidden>
        <div data-testid="children" />
      </PageTitle>,
    );

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.queryByTestId('children')).toBeInTheDocument();

    expect(screen.queryByTestId('page-title')).not.toHaveClass('page-title');

    expect(screen.queryByTestId('page-title')).toHaveClass('visually-hidden');
  });

  it('should render correctly with hidden and className props', () => {
    render(
      <PageTitle className={mockClassName} hidden>
        <div data-testid="children" />
      </PageTitle>,
    );

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.queryByTestId('children')).toBeInTheDocument();

    expect(screen.queryByTestId('page-title')).not.toHaveClass('page-title');

    expect(screen.queryByTestId('page-title')).toHaveClass('visually-hidden');
    expect(screen.queryByTestId('page-title')).toHaveClass(mockClassName);
  });
});

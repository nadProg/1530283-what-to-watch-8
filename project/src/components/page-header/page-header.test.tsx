import { lorem } from 'faker';
import { render, screen } from '@testing-library/react';
import PageHeader from './page-header';

const mockClassName = lorem.word();

describe('Component: PageHeader', () => {
  it('should render correctly with no props', () => {
    render(
      <PageHeader>
        <div>Children</div>
      </PageHeader>,
    );

    expect(screen.queryByText(/Children/i)).toBeInTheDocument();
  });

  it('should render correctly with className props', () => {
    const { container } = render(
      <PageHeader className={mockClassName} >
        <div>Children</div>
      </PageHeader>,
    );

    expect(screen.queryByText(/Children/i)).toBeInTheDocument();
    expect(container.querySelector(`.${mockClassName}`)).toBeTruthy();
  });
});

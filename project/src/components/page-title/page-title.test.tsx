import { lorem } from 'faker';
import { render, screen } from '@testing-library/react';
import PageTitle from './page-title';

const mockClassName = lorem.word();

describe('Component: PageHeader', () => {
  it('should render correctly with no props', () => {
    const { container } = render(
      <PageTitle>
        <div>Children</div>
      </PageTitle>,
    );

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.queryByText(/Children/i)).toBeInTheDocument();
    expect(container.querySelector('.page-title')).toBeTruthy();
    expect(container.querySelector('.visually-hidden')).toBeFalsy();
  });

  it('should render correctly with className props', () => {
    const { container } = render(
      <PageTitle className={mockClassName} >
        <div>Children</div>
      </PageTitle>,
    );

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.queryByText(/Children/i)).toBeInTheDocument();
    expect(container.querySelector('.page-title')).toBeTruthy();
    expect(container.querySelector('.visually-hidden')).toBeFalsy();
    expect(container.querySelector(`.${mockClassName}`)).toBeTruthy();
  });

  it('should render correctly with hidden props', () => {
    const { container } = render(
      <PageTitle hidden>
        <div>Children</div>
      </PageTitle>,
    );

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.queryByText(/Children/i)).toBeInTheDocument();
    expect(container.querySelector('.page-title')).toBeFalsy();
    expect(container.querySelector('.visually-hidden')).toBeTruthy();
  });

  it('should render correctly with hidden and className props', () => {
    const { container } = render(
      <PageTitle className={mockClassName} hidden>
        <div>Children</div>
      </PageTitle>,
    );

    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.queryByText(/Children/i)).toBeInTheDocument();
    expect(container.querySelector('.page-title')).toBeFalsy();
    expect(container.querySelector('.visually-hidden')).toBeTruthy();
    expect(container.querySelector(`.${mockClassName}`)).toBeTruthy();
  });
});

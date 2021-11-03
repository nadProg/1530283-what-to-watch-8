import { lorem } from 'faker';
import { render, screen } from '@testing-library/react';
import Catalog from './catalog';

describe('Component: Catalog', () => {
  it('should render correctly with no props', () => {
    const { container } = render(
      <Catalog>
        <div>Children</div>
      </Catalog>,
    );

    expect(screen.queryByText(/Children/i)).toBeInTheDocument();
    expect(container.querySelector('.catalog--like-this')).toBeFalsy();
  });

  it('should render correctly with title prop', () => {
    const mockTitle = lorem.words();

    const { container } = render(
      <Catalog title={mockTitle}>
        <div>Children</div>
      </Catalog>,
    );

    expect(screen.queryByText(/Children/i)).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(mockTitle, 'i'))).toBeInTheDocument();
    expect(container.classList.contains('catalog--like-this')).toBeFalsy();
    expect(container.querySelector('.catalog__title')).toBeTruthy();
  });

  it('should render correctly with hiddenTitle prop', () => {
    const mockTitle = lorem.words();
    const mockHiddenTitle = lorem.words();

    const { container } =  render(
      <Catalog hiddenTitle={mockHiddenTitle}>
        <div>Children</div>
      </Catalog>,
    );

    expect(screen.queryByText(/Children/i)).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(mockTitle, 'i'))).not.toBeInTheDocument();
    expect(screen.queryByText(new RegExp(mockHiddenTitle, 'i'))).toBeInTheDocument();
    expect(container.querySelector('.catalog__title')).toBeTruthy();
    expect(container.querySelector('.visually-hidden')).toBeTruthy();
    expect(container.classList.contains('catalog--like-this')).toBeFalsy();
  });


  it('should render correctly with likeThis prop', () => {
    const { container } = render(
      <Catalog likeThis>
        <div>Children</div>
      </Catalog>,
    );

    expect(screen.queryByText(/Children/i)).toBeInTheDocument();
    expect(container.querySelector('.catalog--like-this')).toBeTruthy();
  });
});

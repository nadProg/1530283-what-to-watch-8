import { render } from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('should render correctly', () => {
    const { container } = render(<Spinner />);

    expect(container.querySelector('svg')).toBeTruthy();
  });
});

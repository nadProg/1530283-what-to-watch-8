import { render, screen } from '@testing-library/react';
import PageContent from './page-content';

describe('Component: PageContent', () => {
  it('should render correctly', () => {
    render(
      <PageContent>
        <div data-testid="children" />
      </PageContent>,
    );

    expect(screen.queryByTestId('children')).toBeInTheDocument();
  });
});

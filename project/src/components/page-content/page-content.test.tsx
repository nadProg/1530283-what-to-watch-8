import { render, screen } from '@testing-library/react';
import PageContent from './page-content';

describe('Component: PageContent', () => {
  it('should render correctly', () => {
    render(
      <PageContent>
        <div>Children</div>
      </PageContent>,
    );

    expect(screen.queryByText(/Children/i)).toBeInTheDocument();
  });
});

import { render, screen } from '@testing-library/react';
import InfoScreen from './info-screen';

describe('Component: InfoScreen', () => {
  it('should render correctly', () => {
    render(
      <InfoScreen>
        <div>Children</div>
      </InfoScreen>,
    );

    expect(screen.queryByText(/Children/i)).toBeInTheDocument();
  });
});

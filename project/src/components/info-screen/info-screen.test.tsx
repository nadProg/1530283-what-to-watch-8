import { render, screen } from '@testing-library/react';
import InfoScreen from './info-screen';

describe('Component: InfoScreen', () => {
  it('should render correctly', () => {
    render(
      <InfoScreen>
        <div data-testid="children" />
      </InfoScreen>,
    );

    expect(screen.queryByTestId('children')).toBeInTheDocument();
  });
});

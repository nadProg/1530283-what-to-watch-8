import { render } from '@testing-library/react';
import { createMockComments } from '../../mocks/comments';
import FilmCardReviews from './film-card-reviews';

const mockComments = createMockComments();

describe('Component: FilmCardReviews', () => {
  it('should render correctly', () => {
    const { container } = render(
      <FilmCardReviews comments={mockComments} />,
    );

    expect(container.querySelectorAll('.review').length).toBe(mockComments.length);
  });
});

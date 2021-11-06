import { render, screen } from '@testing-library/react';
import { createMockComments } from '../../mocks/comments';
import FilmCardReviews from './film-card-reviews';

const mockComments = createMockComments();

describe('Component: FilmCardReviews', () => {
  it('should render correctly', () => {
    render(
      <FilmCardReviews comments={mockComments} />,
    );

    expect(screen.queryAllByTestId('review')).toHaveLength(mockComments.length);
  });
});

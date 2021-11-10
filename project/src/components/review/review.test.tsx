import { render, screen } from '@testing-library/react';
import { LINE_BREAK } from '../../constants';
import { createMockComment } from '../../mocks/comments';
import { formatHumanizedDate } from '../../utils/date';
import { formatRating } from '../../utils/films';
import Review from './review';

const mockComment = createMockComment();

describe('Component: Review', () => {
  it('should render correctly', () => {
    render(<Review comment={mockComment} />);

    expect(screen.queryByTestId('comment-rating')).toHaveTextContent(formatRating(mockComment.rating));
    expect(screen.queryByTestId('comment-date')).toHaveTextContent(formatHumanizedDate(mockComment.date));
    expect(screen.queryByTestId('comment-user-name')).toHaveTextContent(mockComment.user.name);

    mockComment.comment.split(LINE_BREAK).forEach((paragraph) => {
      expect(screen.queryByText(new RegExp(paragraph, 'i'))).toBeInTheDocument();
    });
  });
});


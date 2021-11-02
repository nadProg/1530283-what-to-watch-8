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

    expect(screen.queryByText(new RegExp(formatRating(mockComment.rating), 'i'))).toBeInTheDocument();
    expect(screen.queryByText(new RegExp(formatHumanizedDate(mockComment.date), 'i'))).toBeInTheDocument();

    mockComment.comment.split(LINE_BREAK).forEach((paragraph) => {
      expect(screen.queryByText(new RegExp(paragraph, 'i'))).toBeInTheDocument();
    });
  });
});


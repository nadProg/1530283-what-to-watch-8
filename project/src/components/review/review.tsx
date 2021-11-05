import { LINE_BREAK } from '../../constants';
import { CommentGet } from '../../types/types';
import { formatDatetime, formatHumanizedDate } from '../../utils/date';
import { formatRating } from '../../utils/films';

type ReviewProps = {
  comment: CommentGet,
}

function Review({comment}: ReviewProps): JSX.Element {
  return (
    <div className="review" data-testid="review">
      <blockquote className="review__quote">
        {comment.comment.split(LINE_BREAK).map((paragraph) => (
          <p key={paragraph} className="review__text">{paragraph}</p>
        ))}

        <footer className="review__details">
          <cite className="review__author">{comment.user.name}</cite>
          <time className="review__date" dateTime={formatDatetime(comment.date)}>{formatHumanizedDate(comment.date)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{formatRating(comment.rating)}</div>
    </div>
  );
}

export default Review;

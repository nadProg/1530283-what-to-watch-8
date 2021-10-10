import { CommentGet } from '../../types/types';

type ReviewProps = {
  comment: CommentGet,
}

function Review({comment}: ReviewProps): JSX.Element {
  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment.comment}</p>

        <footer className="review__details">
          <cite className="review__author">{comment.user.name}</cite>
          <time className="review__date" dateTime="{comment.date.toISOString}">{comment.date.toISOString()}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{comment.rating}</div>
    </div>
  );
}

export default Review;

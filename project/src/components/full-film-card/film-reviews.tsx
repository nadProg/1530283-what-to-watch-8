import { CommentGet } from '../../types/types';
import Review from '../review/review';

type FilmReviewsProps = {
  comments: CommentGet[],
}

function FilmReviews({comments}: FilmReviewsProps): JSX.Element {
  const reviews = comments.map((comment) => <Review key={comment.id} comment={comment} />);
  const middleIndex = Math.ceil(comments.length / 2);
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        { reviews.slice(0, middleIndex) }
      </div>
      <div className="film-card__reviews-col">
        { reviews.slice(middleIndex) }
      </div>
    </div>
  );
}

export default FilmReviews;

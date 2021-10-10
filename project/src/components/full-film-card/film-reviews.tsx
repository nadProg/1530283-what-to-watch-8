import { CommentGet } from '../../types/types';
import { splitArrayInTwo } from '../../utils/common';
import Review from '../review/review';

type FilmReviewsProps = {
  comments: CommentGet[],
}

function FilmReviews({comments}: FilmReviewsProps): JSX.Element {
  const reviews = comments.map((comment) => <Review key={comment.id} comment={comment} />);
  const [ leftReviews, rightReviews ] = splitArrayInTwo(reviews);

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        { leftReviews }
      </div>
      <div className="film-card__reviews-col">
        { rightReviews }
      </div>
    </div>
  );
}

export default FilmReviews;

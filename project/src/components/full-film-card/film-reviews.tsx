import Review from '../review/review';

const COMMENTS_AMOUNT = 5;
const comments = new Array(COMMENTS_AMOUNT).fill(null);

function FilmReviews(): JSX.Element {
  const middleIndex = Math.ceil(comments.length / 2);
  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        { comments.slice(0, middleIndex).map(() => <Review />) }
      </div>
      <div className="film-card__reviews-col">
        { comments.slice(middleIndex).map(() => <Review />) }
      </div>
    </div>
  );
}

export default FilmReviews;

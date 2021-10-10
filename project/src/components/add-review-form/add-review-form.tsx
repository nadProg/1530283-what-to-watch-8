import { useState, ChangeEvent, FormEvent, Fragment } from 'react';

const MAX_RATING = 10;
const INITIAL_RATING = 0;
const INITIAL_COMMENT = '';

function AddReviewForm(): JSX.Element {
  const [rating, setRating] = useState(INITIAL_RATING);
  const [comment, setComment] = useState(INITIAL_COMMENT);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.currentTarget.value));
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.currentTarget.value);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    setRating(INITIAL_RATING);
    setComment(INITIAL_COMMENT);
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleFormSubmit}>
        <div className="rating">
          <div className="rating__stars">
            { new Array(MAX_RATING).fill(null)
              .map((item, index) => index + 1)
              .reverse()
              .map((value) => {
                const inputId = `star-${value}`;
                const checked = value === rating;

                return (
                  <Fragment key={inputId}>
                    <input className="rating__input" id={inputId} type="radio" name="rating" value={value} checked={checked} onChange={handleRatingChange}/>
                    <label className="rating__label" htmlFor={inputId}>Rating {value}</label>
                  </Fragment>
                );
              }) }
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value={comment} onChange={handleCommentChange}></textarea>
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;

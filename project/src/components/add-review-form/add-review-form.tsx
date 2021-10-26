import { useState, ChangeEvent, FormEvent, Fragment, useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { FetchStatus, Rating } from '../../constants';
import { postComment } from '../../store/api-actions';
import { CommentPost, State, ThunkAppDispatch } from '../../types/types';
import {
  validateReviewContent,
  validateReviewRating
} from '../../utils/common';

const INITIAL_RATING = 0;
const INITIAL_COMMENT = '';

type AddReviewFormProps = {
  filmId: number;
};

const mapStateToProps = ({ newComment }: State) => ({
  isFormLoading: newComment.status === FetchStatus.Loading,
});

const mapDispatchToProps = (
  dispatch: ThunkAppDispatch,
  { filmId }: AddReviewFormProps,
) => ({
  createReview(formData: CommentPost) {
    dispatch(postComment(filmId, formData));
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

function AddReviewForm({
  isFormLoading,
  createReview,
}: PropsFromRedux): JSX.Element {
  const [rating, setRating] = useState(INITIAL_RATING);
  const [comment, setComment] = useState(INITIAL_COMMENT);
  const [isFormValid, setFormValidity] = useState(false);

  useEffect(() => {
    setFormValidity(validateReviewRating(rating));
  }, [rating]);

  useEffect(() => {
    setFormValidity(validateReviewContent(comment));
  }, [comment]);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(evt.currentTarget.value));
  };

  const handleCommentChange = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.currentTarget.value);
  };

  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData: CommentPost = {
      rating,
      comment,
    };

    createReview(formData);
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleFormSubmit}>
        <div className="rating">
          <div className="rating__stars">
            {new Array(Rating.MaxValue)
              .fill(null)
              .map((item, index) => index + 1)
              .reverse()
              .map((value) => {
                const inputId = `star-${value}`;
                const checked = value === rating;

                return (
                  <Fragment key={inputId}>
                    <input
                      id={inputId}
                      className="rating__input"
                      type="radio"
                      name="rating"
                      value={value}
                      checked={checked}
                      disabled={isFormLoading}
                      onChange={handleRatingChange}
                    />
                    <label className="rating__label" htmlFor={inputId}>
                      Rating {value}
                    </label>
                  </Fragment>
                );
              })}
          </div>
        </div>

        <div className="add-review__text">
          <textarea
            id="review-text"
            className="add-review__textarea"
            name="review-text"
            placeholder="Review text"
            value={comment}
            disabled={isFormLoading}
            onChange={handleCommentChange}
          />
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              type="submit"
              disabled={!isFormValid || isFormLoading}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export { AddReviewForm };
export default connector(AddReviewForm);

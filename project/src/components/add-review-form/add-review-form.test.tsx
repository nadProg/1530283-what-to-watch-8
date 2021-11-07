import { Provider } from 'react-redux';
import ReactRouter from 'react-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { datatype } from 'faker';
import userEvent from '@testing-library/user-event';
import { State } from '../../types/types';
import { FetchStatus } from '../../constants';
import AddReviewForm from './add-review-form';

const mockStore = configureMockStore<State>();

const store = mockStore({
  comments: {
    newComment: {
      status: FetchStatus.Idle,
    },
  },
});

store.dispatch = jest.fn();

describe('Component: AddReviewForm', () => {
  beforeEach(() => {
    jest.spyOn(ReactRouter, 'useParams').mockReturnValue({ id: String(datatype.number())});
  });

  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <AddReviewForm />
      </Provider>,
    );

    expect(screen.queryByTestId(/star-2/i)).toBeInTheDocument();
    expect(screen.queryByTestId(/star-5/i)).toBeInTheDocument();
    expect(screen.queryByTestId(/star-10/i)).toBeInTheDocument();
    expect(screen.queryByTestId(/form/i)).toBeInTheDocument();
    expect(screen.queryByTestId(/review-text/i)).toBeInTheDocument();
    expect(screen.queryByTestId(/submit-button/i)).toBeInTheDocument();

    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should handle submit action when valid data is provided', () => {
    const validMockReviewText = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.!';

    render(
      <Provider store={store}>
        <AddReviewForm />
      </Provider>,
    );

    userEvent.click(screen.getByTestId(/star-2/i));
    userEvent.type(screen.getByTestId(/review-text/i), validMockReviewText);
    userEvent.click(screen.getByTestId(/submit-button/i));

    expect(screen.getByDisplayValue(new RegExp(validMockReviewText, 'i'))).toBeInTheDocument();
    expect(screen.getByTestId(/submit-button/i)).not.toHaveAttribute('disabled');
    expect(store.dispatch).toHaveBeenCalledTimes(1);
  });

  it('should prevent submit action when rating is not provided', () => {
    const validMockReviewText = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.!';

    render(
      <Provider store={store}>
        <AddReviewForm />
      </Provider>,
    );

    userEvent.type(screen.getByTestId(/review-text/i), validMockReviewText);
    userEvent.click(screen.getByTestId(/submit-button/i));

    expect(screen.getByDisplayValue(new RegExp(validMockReviewText, 'i'))).toBeInTheDocument();
    expect(screen.getByTestId(/submit-button/i)).toHaveAttribute('disabled');
    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should prevent submit when review text is short', () => {
    const invalidMockReviewText = 'Lorem, ipsum';

    render(
      <Provider store={store}>
        <AddReviewForm />
      </Provider>,
    );

    userEvent.click(screen.getByTestId(/star-2/i));
    userEvent.type(screen.getByTestId(/review-text/i), invalidMockReviewText);
    userEvent.click(screen.getByTestId(/submit-button/i));

    expect(screen.getByDisplayValue(new RegExp(invalidMockReviewText, 'i'))).toBeInTheDocument();
    expect(screen.getByTestId(/submit-button/i)).toHaveAttribute('disabled');
    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should prevent submit when review text is long', () => {
    const invalidMockReviewText = 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.! Lorem, ipsum dolor sit amet consectetur adipisicing elit.! Lorem, ipsum dolor sit amet consectetur adipisicing elit.! Lorem, ipsum dolor sit amet consectetur adipisicing elit.! Lorem, ipsum dolor sit amet consectetur adipisicing elit.! Lorem, ipsum dolor sit amet consectetur adipisicing elit.! Lorem, ipsum dolor sit amet consectetur adipisicing elit.! Lorem, ipsum dolor sit amet consectetur adipisicing elit.! Lorem, ipsum dolor sit amet consectetur adipisicing elit.! Lorem, ipsum dolor sit amet consectetur adipisicing elit.! Lorem, ipsum dolor sit amet consectetur adipisicing elit.! Lrem, ipsum dolor sit amet consectetur adipisicing elit.!';

    render(
      <Provider store={store}>
        <AddReviewForm />
      </Provider>,
    );

    userEvent.click(screen.getByTestId(/star-2/i));
    userEvent.type(screen.getByTestId(/review-text/i), invalidMockReviewText);
    userEvent.click(screen.getByTestId(/submit-button/i));

    expect(screen.getByDisplayValue(new RegExp(invalidMockReviewText, 'i'))).toBeInTheDocument();
    expect(screen.getByTestId(/submit-button/i)).toHaveAttribute('disabled');
    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });
});

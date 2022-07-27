import { csrfFetch } from "./csrf";

const GET = "reviews/get-review";
const CREATE = "reviews/create-review";
const DELETE = "reviews/delete-review";

const getSpotReviews = (reviews) => ({
  type: GET,
  reviews,
});

const createSpotReviews = (reviews) => ({
  type: CREATE,
  reviews,
});

const deleteSpotReviews = (reviews) => ({
  type: DELETE,
  reviews,
});

export const getReviews = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(getSpotReviews(reviews));
    return reviews;
  }
};

export const createReview = (data) => async (dispatch) => {
  const { spotId } = data;
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const review = await response.json();
    dispatch(createSpotReviews(review));
    return review;
  }
};

export const removeReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const deletedReview = await response.json();
    dispatch(deleteSpotReviews(deletedReview));
    return deletedReview;
  }
};

const initialState = {};
const reviewsReducer = (state = initialState, action) => {
  console.log("action");
  console.log(action);
  switch (action.type) {
    case GET: {
      const allReviews = action.reviews;
      // console.log();
      // action.spots.forEach((spot) => (allReviews[spot.id] = spot));
      return { ...allReviews };
    }
    case CREATE: {
      return { ...state };
    }
    case DELETE:
      const deleteResponse = action.deleteResponse;
      if (deleteResponse.statusCode === 200) {
        return [];
      }

    default:
      return state;
  }
};

export default reviewsReducer;

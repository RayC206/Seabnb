import { csrfFetch } from "./csrf";

const GET = "reviews/get-review";
const GET_USERS_REVIEWS = "reviews/get-users-reviews";
const CREATE = "reviews/create-review";
const DELETE = "reviews/delete-review";

const getSpotReviews = (reviews) => ({
  type: GET,
  reviews,
});

const getMyReviews = (userReviews) => ({
  type: GET_USERS_REVIEWS,
  userReviews,
});

const createSpotReviews = (reviews) => ({
  type: CREATE,
  reviews,
});

const deleteSpotReviews = (deleteResponse, deletedReviewId) => ({
  type: DELETE,
  deleteResponse,
  deletedReviewId,
});

export const getReviews = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);
  if (response.ok) {
    const reviews = await response.json();
    dispatch(getSpotReviews(reviews));
    return reviews;
  }
};

export const getUserReviews = () => async (dispatch) => {
  const response = await csrfFetch(`/api/users/current-user/reviews`);
  if (response.ok) {
    const userReviews = await response.json();
    console.log("userReviews");
    console.log(userReviews);
    dispatch(getMyReviews(userReviews));
    return userReviews;
  }
  return response;
};

export const createReview = (spotId, data) => async (dispatch) => {
  // const { spotId } = data;
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    header: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  console.log(response);
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
    const deleteResponse = await response.json();
    dispatch(deleteSpotReviews(deleteResponse, reviewId));
    return deleteResponse;
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
    case GET_USERS_REVIEWS: {
      const userReviews = action.userReviews;
      // const newState = {};
      // action.userReviews.forEach((review) => (newState[review.id] = review));
      // let allReviews = { ...newState };
      return userReviews;
    }
    case CREATE: {
      return { ...state };
    }
    case DELETE:
      const deleteResponse = action.deleteResponse;
      if (deleteResponse.statusCode === 200) {
        return {
          ...state.filter((review) => {
            return review.review.id !== action.deletedReviewId;
          }),
        };
      }

    default:
      return state;
  }
};

export default reviewsReducer;

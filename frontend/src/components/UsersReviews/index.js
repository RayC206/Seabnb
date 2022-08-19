import React from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserReviews, removeReview } from "../../store/reviews";
import "../CSS/UsersReviews.css";

const UserReviews = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  // const spot = useSelector((state) => state.spots);
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const reviews = useSelector((state) => {
    let reviewsFromState = Object.values(state.reviews);
    if (reviewsFromState[0] && Array.isArray(reviewsFromState[0])) {
      reviewsFromState = reviewsFromState[0];
    }
    return reviewsFromState;
  });

  useEffect(() => {
    if (!sessionUser) {
      history.push("/");
    }
  });

  useEffect(() => {
    dispatch(getUserReviews(spotId));
  }, [dispatch]);

  const handleDeleteReview = (e, reviewId) => {
    e.preventDefault();
    dispatch(removeReview(reviewId));
    let path = `/my-reviews`;
    history.push(path);
  };

  return (
    <div className="outerReviewContainer">
      {reviews.map((review, index) => {
        if (review) {
          return (
            <div className="innerContainer">
              <div className="eachReviewContainer" key={index}>
                <label>
                  <div>
                    <span>Review:</span>
                    <div>---</div>
                    <div className="reviewDescription">
                      {" "}
                      "{review.review.review}"{" "}
                    </div>
                    <div>---</div>
                    <div className="reviewStarsRating">
                      <span>Rating:</span>{" "}
                      {Number(review.review.stars).toFixed(1)} / 5
                    </div>
                  </div>
                </label>
                <br />
                <br />
              </div>
              <div className="pageButtons">
                <button
                  onClick={(e) => handleDeleteReview(e, review.review.id)}
                >
                  Delete Review
                </button>

                <button>
                  <Link to={`/spots/${review.review.spotId}`}>View Spot</Link>
                </button>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default UserReviews;

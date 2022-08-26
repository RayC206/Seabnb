import React from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserReviews, removeReview } from "../../store/reviews";
import ReviewDeleteConfirmationModal from "./ReviewDeleteConfirmationModal";
import "../CSS/UsersReviews.css";

const UserReviews = () => {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
  useState(false);
const [deletedReviewId, setDeletedReviewId] = useState(null);
  const reviews = useSelector((state) => {
    let reviewsFromState = Object.values(state.reviews);
    if (reviewsFromState[0] && Array.isArray(reviewsFromState[0])) {
      reviewsFromState = reviewsFromState[0];
    }
    return reviewsFromState;
  });

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!sessionUser) {
      history.push("/");
    }
  });

  useEffect(() => {
    dispatch(getUserReviews(spotId)).then(() => setIsLoaded(true));
  }, [dispatch]);

  const handleDeleteReview = (e, reviewId) => {
    e.preventDefault();
    setShowDeleteConfirmationModal(true)
    setDeletedReviewId(reviewId)
  };

  const confirmDelete = () => {
    dispatch(removeReview(deletedReviewId)).then(() => {
      setShowDeleteConfirmationModal(false);
    });
  };


if (isLoaded) {
    if (reviews.length) {
      return (
        <>
         <ReviewDeleteConfirmationModal
              isOpen={showDeleteConfirmationModal}
              onClose={() => setShowDeleteConfirmationModal(false)}
              onConfirm={confirmDelete}
            />
        <div className="userReviewPage">
          <h1 className="myReviewsPageTitle">My Reviews</h1>
          <div className="outerReviewContainer">
            {reviews.map((review, index) => {
              if (review) {
                return (
                  <div className="innerContainer" key={review.review.id}>
                    <div className="eachReviewContainer" key={index}>
                      <label>
                        <div key={index}>
                          <span>Review: </span>
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
        </div>
        </>
      );
    } else {
      return <div>You have no reviews</div>;
    }
  } else {
    return <div>Loading...</div>;
  }
};

export default UserReviews;

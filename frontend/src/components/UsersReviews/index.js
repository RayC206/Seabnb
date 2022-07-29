import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserReviews, removeReview } from "../../store/reviews";

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
  console.log("USERREVIEWS");
  console.log(reviews);

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
    <div>
      {/* <div className= "spot for CSS styling </div> */}
      {reviews.map((review) => {
        if (review) {
          return (
            <div>
              <label>
                Review:
                <div>
                  {/* <div>{review.userId}</div>  */}
                  <div> {review.review.review}</div>
                  <div> Rating : {review.review.stars} / 5</div>
                </div>
              </label>
              <button onClick={(e) => handleDeleteReview(e, review.review.id)}>
                Delete
              </button>
              <br />
              <br />
            </div>
          );
        }
      })}
    </div>
  );
};

export default UserReviews;

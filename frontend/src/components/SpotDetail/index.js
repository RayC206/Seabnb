import React, { useEffect, useState } from "react";
import { useParams, useHistory} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findASpot} from "../../store/spots";
import { getReviews, createReview } from "../../store/reviews";
import "../CSS/SpotsDetail.css";
import { FaStar } from "react-icons/fa";

const SpotsDetail = () => {
  let { spotId } = useParams();
  spotId = Number(spotId);
  const history = useHistory();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots);
  const review = useSelector((state) => state.reviews)
  const reviews = useSelector((state) => state.reviews.reviews);
  const sessionUser = useSelector((state) => state.session.user);
  console.log("here")
  console.log(review)

  // might use this later
  // const isSpotOwner = sessionUser && spot && spot.ownerId === sessionUser.id;

  const [findASpotStatus, setFindASpotStatus] = useState(200);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    dispatch(findASpot(spotId)).catch(async (res) => {
      setFindASpotStatus(res.status);
    });
    dispatch(getReviews(spotId));
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(spot).length && spot.id) {
      setIsLoaded(true);
    }
  }, [spot]);

  const handleCreateReview = (e) => {
    e.preventDefault();
    dispatch(createReview(spotId));
    let path = `/spots/${spotId}/create-review`;
    if (sessionUser) {
      history.push(path);
    } else {
      history.push("/login");
    }
  };

  if (isLoaded) {
    if (findASpotStatus === 200) {
      return (
        <div className="detailContainer">
          <div className="containerBorder">
            <div className="topText" key={spot.id}>
              <h3 className="nameDetail">{spot.name}</h3>
              <h2 className="topText">
                <p className="topDescription">
                  {" "}
                  {Number(spot.avgStarRating) > 0 && reviews ? (
                    <span>
                      {" "}
                      <FaStar className="starRating" />{" "}
                      {Number(spot.avgStarRating).toFixed(1)} - {reviews.length}{" "}
                      reviews - {spot.city}, {spot.state}
                    </span>
                  ) : (
                    <span> No reviews</span>
                  )}
                </p>
              </h2>
              <div className="imageSection">
                <img
                  className="imageDetail"
                  src={spot.previewImage}
                  alt={spot.name}
                ></img>
              </div>
            </div>
          </div>
          <div className="descriptionSection">
            {" "}
            Entire home hosted by {spot.owner.firstName}
          </div>
          <div id="Description">
            {/* <p>
                  {spot.city}, {spot.state}
                </p> */}
            {/* <p className="spotDetailAddress">{spot.address}</p> */}
            <p className="spotDetailDescription">{spot.description}</p>
            <div className="bookingBox">
              <div className="bookingPriceContainer">
                {" "}
                <a className="priceDetail">
                  {" "}
                  <span>${spot.price}</span> night
                </a>{" "}
                <div className="reviewDiv">
                  {Number(spot.avgStarRating) > 0 && reviews ? (
                    <span>
                      {" "}
                      <FaStar className="starRating" />{" "}
                      {Number(spot.avgStarRating).toFixed(2)} ({reviews.length})
                    </span>
                  ) : (
                    <span> No reviews</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="reviewSection">
            <h3>
              {Number(spot.avgStarRating) > 0 && reviews ? (
                <span>
                  {" "}
                  <FaStar className="starRating" />{" "}
                  {Number(spot.avgStarRating).toFixed(1)} - {reviews.length}{" "}
                  reviews
                </span>
              ) : (
                <span> No reviews</span>
              )}
            </h3>
          </div>
          <div className="reviewDiv">
            {reviews &&
              reviews.map((review, index) => {
                return (
                  <div className="eachReview" key={index}>
                    <label>
                      <span>Review:</span>
                      <div>---</div>
                      <div>
                        <div className="reviewMessage"> "{review.review}"</div>
                        <div>---</div>

                        <div className="reviewStars">
                          {" "}
                          <span>Rating :</span>{" "}
                          {Number(review.stars).toFixed(2)} out of 5 stars
                        </div>
                      </div>
                    </label>
                  </div>
                );
              })}
          </div>
          <button className="createReviewButton" onClick={handleCreateReview}>
            Create Review
          </button>
        </div>
      );
    } else if (findASpotStatus === 404) {
      return (
        <div className="fourOhFour">
          <a className="fourOh">404: Spot not found</a>
        </div>
      );
    }
  } else {
    return <div>Loading... </div>;
  }
};

export default SpotsDetail;

import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findASpot } from "../../store/spots";
import { getReviews, createReview } from "../../store/reviews";
import {
  getSpotBookingsRequest,
  createBookingRequest,
} from "../../store/bookings";
import "../CSS/SpotsDetail.css";
import { FaStar } from "react-icons/fa";
import CreateBookingForm from "../Bookings/createBooking.js";
import Map from "../Map/Map";

const SpotsDetail = () => {
  let { spotId } = useParams();
  spotId = Number(spotId);
  const history = useHistory();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots);
  const reviews = useSelector((state) => state.reviews.reviews);
  const sessionUser = useSelector((state) => state.session.user);
  const bookings = useSelector((state) => state.bookings);
  const [findASpotStatus, setFindASpotStatus] = useState(200);
  const [isLoaded, setIsLoaded] = useState(false);

  const spotsImagePage = () => {
    let path = `/spots/${spotId}/images`;
    history.push(path);
  };

  const editSpotPage = () => {
    let path = `/spots/${spotId}/edit`;
    history.push(path);
  };

  const hideButton = {
    display: "none",
  };

  useEffect(() => {
    dispatch(findASpot(spotId))
      .then(() => {
        setIsLoaded(true);
      })
      .catch(async (res) => {
        setFindASpotStatus(res.status);
      });
    dispatch(getReviews(spotId));
    dispatch(getSpotBookingsRequest(spotId));
  }, [dispatch]);

  const handleCreateReview = (e) => {
    e.preventDefault();
    // dispatch(createReview(spotId));
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
                      {Number(spot.avgStarRating).toFixed(1)} -{" "}
                      <span className="reviewTopDescription">
                        {reviews.length} reviews{" "}
                      </span>{" "}
                      - {spot.city}, {spot.state}
                    </span>
                  ) : (
                    <span>
                      {" "}
                      No reviews - {spot.city}, {spot.state}
                    </span>
                  )}
                </p>
              </h2>
              <div onClick={spotsImagePage} className="image-grid">
                <img
                  className="image-grid-col-2 image-grid-row-2"
                  src={spot.previewImage}
                  alt={spot.name}
                ></img>
                {spot.images.map((image, index) => {
                  if (index === 0) {
                    return (
                      <img
                        className=""
                        key={image.id}
                        src={image.url}
                        alt={spot.name}
                      ></img>
                    );
                  }
                  if (index === 1) {
                    return (
                      <img
                        className="top-right-image"
                        key={image.id}
                        src={image.url}
                        alt={spot.name}
                      ></img>
                    );
                  }
                  if (index === 2) {
                    return (
                      <img
                        className=""
                        key={image.id}
                        src={image.url}
                        alt={spot.name}
                      ></img>
                    );
                  }
                  if (index === 3) {
                    return (
                      <img
                        className="bottom-left-image"
                        key={image.id}
                        src={image.url}
                        alt={spot.name}
                      ></img>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <div className="descriptionSection">
            {" "}
            Entire home hosted by {spot.owner.firstName}
          </div>
          <div className="mapContainer">
            <Map spot={spot} />
          </div>
          <div id="Description">
            <p className="spotDetailDescription">{spot.description}</p>
            <div className="bookingBox">
              <div className="bookingPriceContainer">
                {" "}
                <span className="priceDetail">
                  {" "}
                  <span>${spot.price}</span> night
                </span>{" "}
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
              <div>
                {sessionUser &&
                  (sessionUser.id !== spot.ownerId ? (
                    <CreateBookingForm spot={spot} />
                  ) : (
                    <div>
                      <button
                        className="manageListingButton"
                        onClick={editSpotPage}
                      >
                        {" "}
                        Manage Listing{" "}
                      </button>
                    </div>
                  ))}
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
                      <div>{review.user.firstName}</div>
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
          {sessionUser && spot.ownerId === sessionUser.id ? (
            // add style:{hideButton} when i need to hide button for spot owner after presentation
            <button className="createReviewButton" onClick={handleCreateReview}>
              Create Review
            </button>
          ) : (
            <button className="createReviewButton" onClick={handleCreateReview}>
              Create Review
            </button>
          )}
        </div>
      );
    }
  } else if (findASpotStatus === 404) {
    return (
      <div className="fourOhFour">
        <span className="fourOh">404: Spot not found</span>
      </div>
    );
  } else {
    return <div>Loading... </div>;
  }
};

export default SpotsDetail;

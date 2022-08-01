import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editASpot, findASpot, spotDelete } from "../../store/spots";
import { getReviews, createReview } from "../../store/reviews";
import "./SpotsDetail.css";

const SpotsDetail = () => {
  let { spotId } = useParams();
  spotId = Number(spotId);
  const history = useHistory();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots);
  const reviews = useSelector((state) => state.reviews.reviews);
  const sessionUser = useSelector((state) => state.session.user);
  const isSpotOwner = sessionUser && spot && spot.ownerId === sessionUser.id;

  const [findASpotStatus, setFindASpotStatus] = useState(200);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(findASpot(spotId)).catch(async (res) => {
      setFindASpotStatus(res.status);
    });
    dispatch(getReviews(spotId));
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(spot).length) {
      setIsLoaded(true);
    }
  }, [spot]);

  const removeSpot = (e) => {
    e.preventDefault();
    dispatch(spotDelete(spotId));
    history.push("/my-spots");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editASpot(spotId));
    let path = `/spots/${spotId}/edit`;
    history.push(path);
  };

  const handleCreateReview = (e) => {
    e.preventDefault();
    dispatch(createReview(spotId));
    let path = `/spots/${spotId}/create-review`;
    history.push(path);
  };

  if (isLoaded) {
    if (findASpotStatus === 200) {
      return (
        <div className="detailContainer">
          <div className="containerBorder">
            <div key={spot.id}>
              <h3 className="nameDetail">{spot.name}</h3>
              <h4></h4>
              <div>
                <img
                  className="imageDetail"
                  src={spot.previewImage}
                  alt={spot.name}
                ></img>
              </div>
              <div id="Description">
                <label></label>
                <p>
                  {spot.city}, {spot.state}
                </p>
                <p className="spotDetailAddress">{spot.address}</p>
                <p className="spotDetailDescription">{spot.description}</p>
                <p className="spotDetailPrice">
                  {" "}
                  ${spot.price} <a className="priceDetail">night</a>{" "}
                </p>
                <p>
                  {" "}
                  Average rating:
                  {Number(spot.avgStarRating) > 0 ? (
                    <span> {Number(spot.avgStarRating).toFixed(1)} / 5</span>
                  ) : (
                    <span> No reviews</span>
                  )}
                </p>
              </div>
            </div>
            {isSpotOwner && (
              <div className="spotButtons">
                <button onClick={handleEdit}>Edit Spot</button>
                <button onClick={removeSpot}>Delete Spot</button>
              </div>
            )}
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
                          {Number(review.stars).toFixed(1)} out of 5 stars
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
          <div>
            <img src="https://images6.fanpop.com/image/photos/36500000/spongebob-spongebob-squarepants-36544130-500-338.png"></img>
          </div>
        </div>
      );
    }
  } else {
    return <div>Loading... </div>;
  }
};

export default SpotsDetail;

import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editASpot, findASpot, spotDelete } from "../../store/spots";
import { getReviews, createReview, removeReview } from "../../store/reviews";
import "./SpotsDetail.css";

const SpotsDetail = ({reviewId}) => {
  const sessionUser = useSelector(state => state.session.user);
  let { spotId } = useParams();
  spotId = Number(spotId);
  const history = useHistory();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots);
  const reviews = useSelector((state) => state.reviews.reviews);
  const review = useSelector(state => Object.values(state.reviews));
  // const spotReview = review.filter(review => review.reviewId === Number);


  console.log("HERRRE")
  console.log(reviews)
  const [findASpotStatus, setFindASpotStatus] = useState(200);


  useEffect(() => {
    dispatch(findASpot(spotId)).catch(async (res) => {
      setFindASpotStatus(res.status);
    });
    dispatch(getReviews(spotId));
  }, [dispatch]);

  const removeSpot = (e) => {
    e.preventDefault();
    dispatch(spotDelete(spotId));
    history.push("/spots");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editASpot(spotId));
    let path = `/spots/${spotId}/edit`;
    history.push(path);
  };

  const handleCreateReview = (e) => {
    e.preventDefault();
    dispatch(createReview(spotId))
    let path = `/spots/${spotId}/create-review`;
    history.push(path);
  }

  const handleDeleteReview = (e) => {
    e.preventDefault();
    const reviewId = parseInt(e.target.id);
    const userReviewId = parseInt(sessionUser.id)
    dispatch(removeReview(userReviewId))
    let path = `/spots/${spotId}/`;
    history.push(path);
  }

  console.log("spot");
  console.log(spot);
  if (findASpotStatus === 200) {
    return (
      <div>
        {/* {spot.map((spot) => ( */}
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
          <p>
            {spot.city}, {spot.state}
          </p>
          <p>{spot.address}</p>
          <p>{spot.description}</p>
          <p> ${spot.price} night</p>
        </div>
        <button onClick={handleEdit}>Edit Spot</button>

        <button onClick={removeSpot}>Delete Spot</button>
        {/* ))} */}

        {/* TODO: Put in separate component, pass reviews as prop */}
        {/* <SpotReviews reviews={reviews} /> */}
        <div>
          {reviews &&
            reviews.map((review) => {
              return (
                <label>
                  Review:
                  <div>
                    {/* <div>{review.userId}</div>  */}
                    <div> {review.review}</div>
                    <div> Rating : {review.stars} / 5</div>
                  </div>
                </label>
              );
            })}
        </div>
        <button onClick={handleCreateReview}>Create Review</button>
        <button onClick={handleDeleteReview}>Delete</button>
      </div>
    );
  } else if (findASpotStatus === 404) {
    return <div className="fourOhFour">
       <a className="fourOh">404: Spot not found</a>
      <div><img src="https://images6.fanpop.com/image/photos/36500000/spongebob-spongebob-squarepants-36544130-500-338.png"></img></div>

      </div> ;
  }
};

export default SpotsDetail;

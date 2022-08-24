import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import "../CSS/CreateReview.css";

const CreateReview = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { spotId } = useParams();
  spotId = Number(spotId);
  const [reviewMessage, setReviewMessage] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (submitSuccess) {
    return <Redirect to={`/spots/${spotId}/images`} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let data = {
      review: reviewMessage,
      stars: stars,
    };
    return dispatch(reviewActions.createReview(spotId, data))
      .then(async (res) => {
        setSubmitSuccess(true);
      })
      .catch(async (res) => {
        const error = await res.json();
        if (error) setErrors([error.message]);
      });
  };

  return (
    <div className="createReviewContainer">
      <form className="spotsReview" onSubmit={handleSubmit}>
        <h1 className="reviewFormTitle">How was your stay?</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
         <span> Message: </span>
          <input
            type="text"
            placeholder="Review Message"
            value={reviewMessage}
            onChange={(e) => setReviewMessage(e.target.value)}
            required
          />
        </label>
        <label>
          <span> Stars: </span>
          <input
            type="text"
            placeholder="Rating"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          />
        </label>
        {!errors.length ? (
          <button className="createReviewSubmit" type="submit">
            Create Review
          </button>
        ) : (
          <button
            className="backButton"
            onClick={() => {
              let path = `/spots/${spotId}`;
              history.push(path);
            }}
          >
            Go Back
          </button>
        )}
      </form>
    </div>
  );
};

export default CreateReview;

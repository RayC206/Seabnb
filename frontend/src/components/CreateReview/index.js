import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import * as reviewActions from "../../store/reviews";
import "./CreateReview.css";

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
    return <Redirect to={`/spots/${spotId}`} />;
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
    <form className="spotsReview" onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Message:
        <input
          type="text"
          placeholder="Review Message"
          value={reviewMessage}
          onChange={(e) => setReviewMessage(e.target.value)}
          required
        />
      </label>
      <label>
        Stars:
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
          Back
        </button>
      )}
    </form>
  );
};

export default CreateReview;

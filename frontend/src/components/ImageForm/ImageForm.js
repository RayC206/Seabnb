import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { addSpotImage } from "../../store/images";


const ImageForm = () => {
  let { spotId } = useParams();
  spotId = Number(spotId);
  const dispatch = useDispatch();
  const history = useHistory();
  const [imageUrl, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  if (submitSuccess) {
    return <Redirect to={`/spots/${spotId}/images`} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let data = {
      url: imageUrl,
    };
    return dispatch(addSpotImage(spotId, data))
      .then(async (res) => {
        setSubmitSuccess(true);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data) {
          if (data.errors) {
            setErrors(data.errors);
          } else if (data.message) {
            setErrors([data.message]);
          }
        }
      });
  };


  return (
      <form className="imageFormContainer" onSubmit={handleSubmit}>
        <h1 className="welcomeContainer">Add an Image</h1>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label className="formLable">
          <span> Image URL:</span>
          <input
            className="imgUrlInput"
            type="text"
            placeholder="Img URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            required
            />
        </label>
        {!errors.length ? (
          <button className="imageFormSubmit" type="submit">
            Add Image
          </button>
        ) : (
          <button
            className="backButton"
            onClick={() => {
              let path = `/spots/${spotId}/images`;
              history.push(path);
            }}
          >
            Go Back
          </button>
        )}
      </form>
  );
};

export default ImageForm;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import * as spotActions from "../../store/spots";
import "./EditSpot.css";

const EditSpot = () => {
  const dispatch = useDispatch();
  let { spotId } = useParams();
  spotId = Number(spotId);
  const spot = useSelector((state) => state.spots);
  const [address, setAddress] = useState(spot.address);
  const [city, setCity] = useState(spot.city);
  const [state, setState] = useState(spot.state);
  const [country, setCountry] = useState(spot.country);
  const [lat, setLat] = useState(spot.lat);
  const [lng, setLng] = useState(spot.lng);
  const [name, setName] = useState(spot.name);
  const [description, setDescription] = useState(spot.description);
  const [price, setPrice] = useState(spot.price);
  const [previewImage, setPreviewImage] = useState(
    "https://static.wikia.nocookie.net/hypotheticalspongebob/images/2/2d/Plankton%27s_House.png"
  );
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateLat = (e) => setLat(e.target.value);
  const updateLng = (e) => setLng(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  // const updatePreviewImage = (e) => setPreviewImage(e.target.value);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(spotActions.findASpot(spotId));
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(spot).length && spot.id) {
      setIsLoaded(true);
      console.log("SPOT");
      console.log(spot);
      setAddress(spot.address);
      setCity(spot.city);
      setState(spot.state);
      setCountry(spot.country);
      setLat(spot.lat);
      setLng(spot.lng);
      setName(spot.name);
      setPrice(spot.price);
      setPreviewImage(spot.previewImage);
      setDescription(spot.description);
    }
  }, [spot]);

  if (submitSuccess) {
    return <Redirect to={`/my-spots`} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let data = {
      address: address,
      city: city,
      state: state,
      country: country,
      previewImage: previewImage,
      lat: lat,
      lng: lng,
      name: name,
      description: description,
      price: price,
    };

    return dispatch(spotActions.editASpot(data, spotId))
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

  if (isLoaded) {
    return (
      <div className="editSpotContainer">
        <form className="spotsEdit" onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <label>
            <span>Name:</span>
            <input
              type="text"
              placeholder="Spot name"
              value={name}
              onChange={updateName}
            />
          </label>
          <label>
            <span>Address:</span>
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={updateAddress}
            />
          </label>
          <label>
            <span>City:</span>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={updateCity}
            />
          </label>
          <label>
            <span>State:</span>
            <input
              type="text"
              placeholder="State"
              value={state}
              onChange={updateState}
            />
          </label>
          <label>
            <span>Country:</span>
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={updateCountry}
            />
          </label>
          <label>
            <span>Latitude:</span>
            <input
              type="text"
              placeholder="Latitude"
              value={lat}
              onChange={updateLat}
            />
          </label>
          <label>
            <span>Longitude:</span>
            <input
              type="text"
              placeholder="Longitude"
              value={lng}
              onChange={updateLng}
            />
          </label>
          <label>
            <span>Description:</span>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={updateDescription}
            />
          </label>
          <label>
            <span>Price:</span>
            <input
              type="text"
              value={price}
              placeholder="Price"
              onChange={updatePrice}
            />
          </label>
          <label>
            <span>Image URL:</span>
            <input
              type="text"
              placeholder="img-url"
              value={previewImage}
              onChange={setPreviewImage}
            />
          </label>
          <button className="editSpotButton" type="submit">
            Edit Spot
          </button>
        </form>
      </div>
    );
  } else {
    return <div>Loading... </div>;
  }
};

export default EditSpot;

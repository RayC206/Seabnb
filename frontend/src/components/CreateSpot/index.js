import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import * as spotActions from "../../store/spots";
import "./CreateSpot.css";

const CreateSpot = () => {
  // const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [previewImage, setPreviewImage] = useState("https://static.wikia.nocookie.net/hypotheticalspongebob/images/2/2d/Plankton%27s_House.png");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);


  if (submitSuccess) {
    return <Redirect to="/spots" />;
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
    return dispatch(spotActions.createNewSpot(data))
      .then(async (res) => {
        setSubmitSuccess(true);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className="formContainer">
    <form className='spotsCreate' onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label className="createName">
       <span> Name: </span>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label>
        <span>Address:</span>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        <span>City:</span>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </label>
      <label>
        <span>State:</span>
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
          required
        />
      </label>
      <label className="createCountry">
        <span>Country:</span>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
      </label>
      <label className="createLat">
        <span>Latitude:</span>
        <input
          type="text"
          placeholder="Latitude"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          required
        />
      </label>
      <label className="createLong">
        <span>Longitude:</span>
        <input
          type="text"
          placeholder="Longitude"
          value={lng}
          onChange={(e) => setLng(e.target.value)}
          required
        />
      </label>
      <label className="createDescription">
          <span>Description:</span>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </label>
      <label className="createPrice">
        <span>Price per night:</span>
        <input
          type="text"
          placeholder="$"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        </label>
      <label className="createImg" >
        <span>Image Url:</span>
        <input
          type="text"
          placeholder="img-url"
          value={previewImage}
          onChange={(e) => setPreviewImage(e.target.value)}
        />
      </label>
      <button className='createSpotButton' type="submit">Create New Spot</button>
    </form>
    </div>
  );
};

export default CreateSpot;

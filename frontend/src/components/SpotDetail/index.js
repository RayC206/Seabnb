import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editASpot, findASpot, spotDelete } from "../../store/spots";
// import EditSpot from "../EditSpot";

const SpotsDetail = () => {
  let { spotId } = useParams();
  spotId = Number(spotId);
  const history = useHistory();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots);
  console.log(spot);
  // const images = spot.images;
  // console.log(images);

  // spot.images.forEach((image) => {
  //   console.log(image);
  // });

  // const spot= useSelector((state) => Object.values(state.spots.spotId));
  // console.log(spot)

  useEffect(() => {
    dispatch(findASpot(spotId));
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

  return (
    <div>
      {/* {spot.map((spot) => ( */}
      <div key={spot.id}>
        <h3>{spot.name}</h3>
        <h4>
          {spot.city}, {spot.state}
        </h4>
        <div>
        <img src={spot.previewImage} alt={spot.name}></img>
        </div>
        <p>{spot.address}</p>
        <p>{spot.description}</p>
        <p> ${spot.price} night</p>
      </div>
      <button onClick={handleEdit}>Edit</button>

      <button onClick={removeSpot}>Delete</button>
      {/* ))} */}
    </div>
  );
};

export default SpotsDetail;

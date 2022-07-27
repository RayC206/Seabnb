import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editASpot, findASpot, spotDelete } from "../../store/spots";
import "./SpotsDetail.css"


const SpotsDetail = () => {
  let { spotId } = useParams();
  spotId = Number(spotId);
  const history = useHistory();
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots);
  console.log(spot);


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
        <h3 className="nameDetail">{spot.name}</h3>
        <h4>
        </h4>
        <div>
        <img className="imageDetail" src={spot.previewImage} alt={spot.name}></img>
        </div>
          <p>{spot.city}, {spot.state}</p>
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

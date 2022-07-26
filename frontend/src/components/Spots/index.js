import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import "./spots.css";

const SpotsPage = () => {
  const dispatch = useDispatch();
  let { spotId } = useParams();
  spotId = Number(spotId);
  const spotsList = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  return (
    <div className="spotsPage">
      <div className="left"></div>
      {spotsList.map((spot) => {
        if (spot) {
          return (
            <NavLink to={`/spots/${spot.id}`}>
              <div className="eachSpot" key={spot.id}>
                <h3 className="spotName">{spot.name}</h3>
                <h4 className="spotLocation">
                  {spot.city}, {spot.state}
                </h4>
                <img
                  className="spotImg"
                  src={spot.previewImage}
                  alt={spot.name}
                ></img>
                <p className="spotAddress">{spot.address}</p>
                <p className="spotDetails">{spot.description}</p>
                <p className="spotPrice"> Price: ${spot.price}</p>
              </div>
            </NavLink>
          );
        }
      })}
    </div>
  );
};

export default SpotsPage;
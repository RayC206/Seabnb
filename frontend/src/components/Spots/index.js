import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSpots } from "../../store/spots";

const SpotsPage = () => {
  const dispatch = useDispatch();
  const spotsList = useSelector((state) => Object.values(state.spots));
  console.log(spotsList);

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  return (
    <div>
      {spotsList.map((spot) => {
        if (spot) {
          return (
            <div key={spot.id}>
              <h3>{spot.name}</h3>
              <h4>
                {spot.city}, {spot.state}
              </h4>
              <img src={spot.previewImage} alt={spot.name}></img>
              <p>{spot.description}</p>
              <p> Price: ${spot.price}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default SpotsPage;

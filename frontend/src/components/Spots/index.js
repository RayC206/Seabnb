import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllSpots, findASpot } from "../../store/spots"




const SpotsPage = () => {
  const dispatch = useDispatch();
  const spotsList = useSelector((state) => Object.values(state.spots));
  console.log(spotsList)

  useEffect(() => {
    dispatch(getAllSpots());

}, [dispatch])



return (
  <div>{spotsList.map(spot => (
    <div key={spot.id}>
        <h3>{spot.name}</h3>
        <h4>{spot.city}, {spot.state}</h4>
        <img src={spot.previewImage}></img>
        <p>{spot.description}</p>
        <p> Price: ${spot.price}</p>
    </div>
))}</div>
)
}

export default SpotsPage;

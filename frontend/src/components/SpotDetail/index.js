import React, {  useEffect } from "react";
import {  useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findASpot } from "../../store/spots"



const SpotsDetail = () => {
  const dispatch = useDispatch();
  let { spotId } = useParams()
  spotId = Number(spotId)
  const spot= useSelector((state) => Object.values(state.spots[spotId]));
  console.log(spot)

  useEffect(() => {
    dispatch(findASpot());

}, [dispatch])



  return (
    <div>{spot.map(spot => (
      <div key={spot.id}>
          <h3>{spot.name}</h3>
          <h4>{spot.city}, {spot.state}</h4>
          <img src={spot.previewImage} alt= {spot.name}></img>
          <p>{spot.description}</p>
          <p> Price: ${spot.price}</p>
      </div>
  ))}</div>
  )
  }

export default SpotsDetail;

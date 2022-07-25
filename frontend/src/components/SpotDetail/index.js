import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllSpots, findASpot } from "../../store/spots"



const SpotsDetail = () => {
  let { spotId } = useParams()
  spotId = Number(spotId)
  const spot = useSelector((state) => state.spots[spotId]);




  return (
    <>
      <h1>{spot.name}</h1>
      <div>
      </div>

    </>
  )
}

export default SpotsDetail;

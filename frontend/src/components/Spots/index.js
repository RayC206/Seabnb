import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllSpots, findASpot } from "../../store/spots"
// import "./SpotDetail.css"


const SpotsPage = () => {
  let { spotId } = useParams()
  spotId = Number(spotId)
  const spot = useSelector((state) => state.spots[spotId]);




  return (
    <>
      <h1>Test</h1>
      <div>
      </div>

    </>
  )
}

export default SpotsPage;

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllSpots, findASpot } from "../../store/spots"
// import "./SpotDetail.css"


const SpotsPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector((state) => Object.values(state.spots));
  console.log(spots)

  useEffect(() => {
    dispatch(getAllSpots());
    window.scrollTo(0, 0);
}, [dispatch])



  return (
    <>
      <h1>Test</h1>
      <div>
      </div>

    </>
  )
}

export default SpotsPage;

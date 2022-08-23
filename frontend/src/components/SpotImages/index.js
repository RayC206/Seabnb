import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { addSpotImage } from '../../store/images'
import { findASpot } from "../../store/spots";
import '../CSS/SpotImages.css'

const SpotImages = () => {
  let { spotId } = useParams();
  spotId = Number(spotId);
  const spot = useSelector((state) => state.spots);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const [findASpotStatus, setFindASpotStatus] = useState(200);
  const [isLoaded, setIsLoaded] = useState(false);
  console.log("HERE")
  console.log(spot.images)


  useEffect(() => {
    dispatch(findASpot(spotId)).catch(async (res) => {
      setFindASpotStatus(res.status);
    });
    // dispatch(addSpotImage(spotId))
  },[dispatch])

  useEffect(() => {
    if (Object.keys(spot).length && spot.id) {
      setIsLoaded(true);
    }
  }, [spot]);


  if (isLoaded) {
    if (findASpotStatus === 200) {
      return (
      <div className="imagePageContainer">
        <div className="imagePage-grid">
        <img
          className="imagePage-grid-col-2 imagePage-grid-row-2"
          src={spot.previewImage}
          alt={spot.name}
        ></img>
        {spot.images.map((image,index)=>{
          if (index === 0) {
            return (
              <img
               className=""
               src={image}
               alt={spot.name}
             ></img>
            )
          }
          if (index === 1) {
            return(
              <img
               className="top-right-image"
               src={image}
               alt={spot.name}
             ></img>
            )
          }
          if (index === 2) {
            return (
              <img
               className=""
               src={image}
               alt={spot.name}
             ></img>
            )
          }
          if (index === 3) {
            return (
              <img
               className="bottom-left-image"
               src={image}
               alt={spot.name}
             ></img>
            )
          } else {


            }
          })}
        </div>

      </div>
      )
    } else if (findASpotStatus === 404) {
      return (
        <div className="fourOhFour">
        <a className="fourOh">404: Spot not found</a>
      </div>
      )
    }
  } else {
    return <div>Loading... </div>;
  }
}


export default SpotImages;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { addSpotImage } from '../../store/images'
import { findASpot } from "../../store/spots";
import '../CSS/SpotImages.css'
import ImageFormModal from "../ImageForm/ImageForm";

const SpotImages = () => {
  let { spotId } = useParams();
  spotId = Number(spotId);
  const spot = useSelector((state) => state.spots);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [findASpotStatus, setFindASpotStatus] = useState(200);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageFormModalIsOpen, setImageFormModalIsOpen] = useState(false);


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
          <button className="backButton" onClick={history.goBack}>Go Back</button>
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
               className=""
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
               className=""
               src={image}
               alt={spot.name}
             ></img>
            )
          }
          if (index === 4) {
            return (
              <img
               className=""
               src={image}
               alt={spot.name}
             ></img>
            )
          }
          if (index === 5) {
            return (
              <img
               className=""
               src={image}
               alt={spot.name}
             ></img>
            )
          }
          if (index === 6) {
            return (
              <img
               className=""
               src={image}
               alt={spot.name}
             ></img>
            )
          }
          if (index === 7) {
            return (
              <img
               className=""
               src={image}
               alt={spot.name}
             ></img>
            )
          }
          if (index === 8) {
            return (
              <img
               className=""
               src={image}
               alt={spot.name}
             ></img>
            )
          }
          if (index === 9) {
            return (
              <img
               className=""
               src={image}
               alt={spot.name}
             ></img>
            )
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

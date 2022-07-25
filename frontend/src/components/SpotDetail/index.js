import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findASpot } from "../../store/spots";

const SpotsDetail = () => {
  let { spotId } = useParams();
  spotId = Number(spotId);
  const dispatch = useDispatch();
  const spot = useSelector((state) => state.spots);
  console.log(spot);
  // const images = spot.images;
  // console.log(images);
  
  // spot.images.forEach((image) => {
  //   console.log(image);
  // });

  // const spot= useSelector((state) => Object.values(state.spots.spotId));
  // console.log(spot)

  useEffect(() => {
    dispatch(findASpot(spotId));
  }, [dispatch]);

  return (
    <div>
      {/* {spot.map((spot) => ( */}
      <div key={spot.id}>
        <h3>{spot.name}</h3>
        <h4>
          {spot.city}, {spot.state}
        </h4>
        <div>{spot.images}</div>

        <div>
          {/* {spot.images.map((image) => (
            <div>{image}</div>
            // <img src={image} alt={spot.name}></img> */}
          {/* ))} */}
        </div>
        <p>{spot.description}</p>
        <p> Price: ${spot.price}</p>
      </div>
      {/* ))} */}
    </div>

  );
};

export default SpotsDetail;

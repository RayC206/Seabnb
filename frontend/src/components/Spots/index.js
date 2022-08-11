import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import "./spots.css";

const SpotsPage = () => {
  const dispatch = useDispatch();
  let { spotId } = useParams();
  spotId = Number(spotId);
  const spotsList = useSelector((state) => {
    let spots = Object.values(state.spots);
    if (spots[0] && spots[0].address) {
      // if state.spots is a list of spot objects, return the list
      return spots;
    }
    return []; // if not, that means spotsList is just one spot spread out into an array
  });
  console.log(spotsList);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  useEffect(() => {
    if (spotsList.length) {
      setIsLoaded(true);
    }
  }, [spotsList]);

  if (isLoaded) {
    return (
      <div className="spotsPage">
        <div className="left"></div>
        {spotsList.map((spot, index) => {
          if (spot) {
            return (
              <div key={index}>
                <NavLink to={`/spots/${spot.id}`}>
                  <div className="eachSpot" key={spot.id}>
                    <img
                      className="spotImg"
                      src={spot.previewImage}
                      alt={spot.name}
                    ></img>
                    <h3 className="spotName">{spot.name}</h3>
                    <h4 className="spotLocation">
                      {spot.city}, {spot.state}
                    </h4>
                    <p className="spotAddress">{spot.address}</p>
                    <p className="spotDetails">{spot.description}</p>
                    <p className="spotPrice"> ${spot.price} night</p>
                    <p>
                      {" "}
                      Average rating:
                      {Number(spot.avgStarRating) > 0 ? (
                        <span>
                          {" "}
                          {Number(spot.avgStarRating).toFixed(1)} / 5
                        </span>
                      ) : (
                        <span> No reviews</span>
                      )}
                    </p>
                  </div>
                </NavLink>
              </div>
            );
          }
        })}
      </div>
    );
  } else {
    return <div>Loading... </div>;
  }
};

export default SpotsPage;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { getAllSpots } from "../../store/spots";
import { FaStar } from "react-icons/fa";
import "../CSS/spots.css";

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
    dispatch(getAllSpots()).then(() => setIsLoaded(true));
  }, [dispatch]);

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
                    <div className="eachSpotDetail">
                      <img
                        className="spotImg"
                        src={spot.previewImage}
                        alt={spot.name}
                      ></img>
                      <div className="spotName">
                        <p>{spot.name}</p>
                        <p className="spotAverageRating">
                          {" "}
                          {Number(spot.avgStarRating) > 0 ? (
                            <span>
                              {" "}
                              <FaStar className="starRating" />{" "}
                              {Number(spot.avgStarRating).toFixed(1)}
                            </span>
                          ) : (
                            <span> No reviews</span>
                          )}
                        </p>
                      </div>
                      <p className="spotLocation">
                        {spot.city}, {spot.state}
                      </p>
                      <p className="spotAddress">{spot.address}</p>
                      {/* <p className="spotDetails">{spot.description}</p> */}
                      <p className="spotPrice">
                        {" "}
                        <b>${spot.price}</b> night{" "}
                      </p>
                    </div>
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

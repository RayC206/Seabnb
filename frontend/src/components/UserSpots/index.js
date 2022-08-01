import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUsersSpots } from "../../store/spots";
import { editASpot, findASpot, spotDelete } from "../../store/spots";

const UserSpots = () => {
  const history = useHistory();
  let { spotId } = useParams();
  spotId = Number(spotId);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const spots = useSelector((state) => Object.values(state.spots));

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!sessionUser) {
      history.push("/");
    }
  });

  useEffect(() => {
    dispatch(getUsersSpots());
  }, [dispatch]);

  useEffect(() => {
    // check if spots is not [] anymore (empty state)
    if (spots.length && spots[0].id) {
      setIsLoaded(true);
    }
  }, [spots]);

  if (isLoaded) {
    return (
      <div className="spotsPage">
        <div className="left"></div>
        {spots.map((spot, index) => {
          if (spot) {
            return (
              <div key={index}>
                <NavLink to={`/spots/${spot.id}`}>
                  <div className="eachSpot">
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
                  </div>
                </NavLink>
                {/* <div className="spotButtons">
                  <button onClick={(e) => handleEdit(e, spot.id)}>
                    Edit Spot
                  </button>
                  <button onClick={(e) => removeSpot(e, spot.id)}>
                    Delete Spot
                  </button>
                </div> */}
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

export default UserSpots;

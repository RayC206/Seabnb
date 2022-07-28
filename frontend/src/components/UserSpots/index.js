import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getAllSpots } from "../../store/spots";

const UserSpots = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const spots = useSelector((state) => Object.values(state.spots));
  const history = useHistory();
  console.log("USERSPOTS");

  useEffect(() => {
    if (!sessionUser) {
      history.push("/");
    }
  });

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  let userSpots;
  console.log(spots);
  if (sessionUser && spots) {
    userSpots = spots.filter((spot) => spot.ownerId === sessionUser.id);
  }

  return (
    <div className="spotsPage">
      <div className="left"></div>
      {userSpots.map((spot) => {
        if (spot) {
          return (
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
              </div>
            </NavLink>
          );
        }
      })}
    </div>
  );
};

export default UserSpots;

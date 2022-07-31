import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUsersSpots } from "../../store/spots";
import { editASpot, findASpot, spotDelete } from "../../store/spots";

const UserSpots = () => {
  let { spotId } = useParams();
  spotId = Number(spotId);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const spots = useSelector((state) => Object.values(state.spots));
  const history = useHistory();


  useEffect(() => {
    if (!sessionUser) {
      history.push("/");
    }
  });

  useEffect(() => {
    dispatch(getUsersSpots());
  }, [dispatch]);

  const removeSpot = (e) => {
    e.preventDefault();
    dispatch(spotDelete(spotId));
    history.push("/spots");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    dispatch(editASpot(spotId));
    let path = `/spots/${spotId}/edit`;
    history.push(path);
  };




  return (
    <div className="spotsPage">
      <div className="left"></div>
      {spots.map((spot, index) => {
        if (spot) {
          return (
            <div key = {index}>
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
            <div className="spotButtons">
            <button onClick={handleEdit}>Edit Spot</button>
            <button onClick={removeSpot}>Delete Spot</button>
            </div>
            </div>
          );
        }
      })}
    </div>
  );
};

export default UserSpots;

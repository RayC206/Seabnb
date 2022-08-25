import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUsersSpots } from "../../store/spots";
import { spotDelete } from "../../store/spots";
import '../CSS/UsersSpots.css';

const UserSpots = () => {
  const history = useHistory();
  let { spotId } = useParams();
  spotId = Number(spotId);
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const spots = useSelector((state) => Object.values(state.spots));

  const [isLoaded, setIsLoaded] = useState(false);

  console.log(spots);

  useEffect(() => {
    if (!sessionUser) {
      history.push("/");
    }
  });

  useEffect(() => {
    dispatch(getUsersSpots()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const removeSpot = (e, spotId) => {
    e.preventDefault();
    dispatch(spotDelete(spotId));
  };

  const handleEdit = (e, spotId) => {
    e.preventDefault();
    let path = `/spots/${spotId}/edit`;
    history.push(path);
  };

  if (isLoaded) {
    if (spots.length) {
      return (
        <div className="userSpotsPage">
          <h1 className="manageListingPageTitle">My Listings</h1>
          <div className="left"></div>
          {spots.map((spot, index) => {
            if (spot) {
              return (
                <div key={index}>
                  <NavLink to={`/spots/${spot.id}`}>
                    <div className="eachUsersSpot" key={spot.id}>
                      <div className="eachUserSpotContainer">
                        <img
                          className="userSpotImg"
                          src={spot.previewImage}
                          alt={spot.name}
                        ></img>
                        <div className="userSpotDetails">
                          <p className="userSpotName">
                            <p>{spot.name}</p>
                          </p>
                          <p className="userSpotLocation">
                            {spot.city}, {spot.state}
                          </p>
                          <p className="userSpotAddress">{spot.address}</p>
                          <p className="userSpotPrice">
                            {" "}
                            <b>${spot.price}</b> night{" "}
                          </p>
                        </div>
                      </div>
                    </div>
                  </NavLink>
                  <div className="pageButtons">
                    <button onClick={(e) => handleEdit(e, spot.id)}>
                      Edit Listing
                    </button>
                    <button onClick={(e) => removeSpot(e, spot.id)}>
                      Delete Listing
                    </button>
                  </div>
                </div>
              );
            }
          })}
        </div>
      );
    } else {
      return (
        <div>
          You don't have any spots.{" "}
          <Link to="spots/create">Click here to add a spot.</Link>
        </div>
      );
    }
  } else {
    return <div>Loading...</div>;
  }
};

export default UserSpots;

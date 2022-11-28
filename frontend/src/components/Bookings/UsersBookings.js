import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, NavLink } from "react-router-dom";
import {
  getCurrentUserBookingsRequest,
  deleteBookingRequest,
} from "../../store/bookings";

import "./UsersBooking.css"

function UserBookings() {
  const dispatch = useDispatch();
  const usersBookings = useSelector((state) => Object.values(state.bookings));
  const [isLoaded, setIsLoaded] = useState(false);
  console.log("here");
  console.log(usersBookings);
  console.log(usersBookings.length);

  useEffect(() => {
    dispatch(getCurrentUserBookingsRequest()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <div className="bookingsPageDiv">
      <h1 className="manageListingPageTitle">My Bookings</h1>
      {isLoaded ? (
        usersBookings.length ? (
          usersBookings.map((booking) => {
            let spot = booking.Spot;
            let startDate = new Date(booking.startDate).toLocaleString();
            let endDate = new Date(booking.endDate).toLocaleString();
            return (
              <>
                <div className="bookingsSpotDiv">
                  <div>
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
                              <p className="userSpotAddress">{spot.address}</p>
                              <div className="bookingDates">
                                <p>Start date: {startDate}</p>
                                <p>End Date: {endDate}</p>
                              </div>
                              <p className="userSpotPrice">
                                {" "}
                                <b>${spot.price}</b> night{" "}
                              </p>
                            </p>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          <div>No bookings</div>
        )
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default UserBookings;

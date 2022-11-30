import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, NavLink, useParams } from "react-router-dom";
import moment from "moment";
import {
  getCurrentUserBookingsRequest,
  deleteBookingRequest,
} from "../../store/bookings";

import CreateBookingForm from "../Bookings/CreateBooking.js";

import "./UsersBooking.css";

function UserBookings() {
  const dispatch = useDispatch();
  let { bookingId } = useParams();
  bookingId = Number(bookingId);
  const usersBookings = useSelector((state) => Object.values(state.bookings));
  const [isLoaded, setIsLoaded] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  useEffect(() => {
    dispatch(getCurrentUserBookingsRequest()).then(() => setIsLoaded(true));
  }, [dispatch]);

  const confirmDelete = (bookingId) => {
    dispatch(deleteBookingRequest(bookingId));
  };

  const toggleEditForm = () => {
    setShowEditForm(true);
  };

  return (
    <div className="bookingsPageDiv">
      <h1 className="manageListingPageTitle">My Bookings</h1>
      {isLoaded ? (
        usersBookings.length ? (
          <>
            <div>
              <div>
                <h2 className="manageListingPageTitle">Upcoming Trips</h2>
              </div>
              {usersBookings.map((booking) => {
                let spot = booking.Spot;
                let startDate = moment(booking.startDate).format("LL");
                let endDate = moment(booking.endDate).format("LL");
                let today = new Date();
                let isBookingInThePast = new Date(booking.startDate) < today;

                if (!isBookingInThePast) {
                  return (
                    <>
                      <div className="bookingsSpotDiv">
                        <div>
                          <div className="eachUsersSpot" key={spot.id}>
                            <NavLink to={`/spots/${spot.id}`}>
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
                                    <p className="userSpotAddress">
                                      {spot.address}
                                    </p>
                                    <p className="userSpotPrice">
                                      {" "}
                                      <b>${spot.price}</b> night{" "}
                                    </p>
                                  </p>
                                </div>
                              </div>
                            </NavLink>
                            <div className="bookingDates">
                              <span>Check-in: {startDate}</span>
                              <span>Checkout: {endDate}</span>
                              {!isBookingInThePast && (
                                <>
                                  <div className="bookingButtons">
                                    {/* <button
                                      className="deleteBooking"
                                      onClick={toggleEditForm}
                                    >
                                      Edit
                                    </button> */}
                                    <button
                                      className="deleteBooking"
                                      onClick={() => {
                                        confirmDelete(booking.id);
                                      }}
                                    >
                                      Delete
                                    </button>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }
              })}
            </div>
            <div>
              <div>
                <h2 className="manageListingPageTitle">Past Trips</h2>
              </div>
              {usersBookings.map((booking) => {
                let spot = booking.Spot;
                let startDate = moment(booking.startDate).format("LL");
                let endDate = moment(booking.endDate).format("LL");
                let today = new Date();
                let isBookingInThePast = new Date(booking.startDate) < today;

                if (isBookingInThePast) {
                  return (
                    <>
                      <div className="bookingsSpotDiv">
                        <div>
                          <div className="eachUsersSpotPast" key={spot.id}>
                            <NavLink to={`/spots/${spot.id}`}>
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
                                    <p className="userSpotAddress">
                                      {spot.address}
                                    </p>
                                    <div className="bookingDates">
                                      <p>Check-in: {startDate}</p>
                                      <p>Checkout: {endDate}</p>
                                      {!isBookingInThePast && (
                                        <div className="bookingButtons">
                                          <button className="deleteBooking">
                                            Edit
                                          </button>
                                          <button
                                            className="editBooking"
                                            onClick={() => {
                                              confirmDelete(booking.id);
                                            }}
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                    <p className="userSpotPrice">
                                      {" "}
                                      <b>${spot.price}</b> night{" "}
                                    </p>
                                  </p>
                                </div>
                              </div>
                            </NavLink>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }
              })}
            </div>
          </>
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

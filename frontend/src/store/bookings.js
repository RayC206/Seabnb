import { csrfFetch } from "./csrf";

const GET_CURRENT_USER_BOOKINGS = "bookings/get_current";
const GET_ALL_BOOKINGS = "bookings/get_all";
const CREATE_BOOKING = "bookings/create";
const DELETE_BOOKING = "bookings/delete";
const EDIT_BOOKING = "bookings/edit";

const getCurrentUserBookings = (bookings) => {
  return {
    type: GET_CURRENT_USER_BOOKINGS,
    bookings,
  };
};

const getSpotBookings = (bookings) => {
  return {
    type: GET_ALL_BOOKINGS,
    bookings,
  };
};

const createBooking = (booking) => {
  return {
    type: CREATE_BOOKING,
    booking,
  };
};

const deleteBooking = (deletedBookingId) => {
  return {
    type: DELETE_BOOKING,
    deletedBookingId,
  };
};

const editBooking = (booking) => {
  return {
    type: EDIT_BOOKING,
    booking,
  };
};

// Get current user booking
export const getCurrentUserBookingsRequest = () => async (dispatch) => {
  const response = await csrfFetch("/api/users/current-user/bookings");
  if (response.ok) {
    const bookings = await response.json();
    dispatch(getCurrentUserBookings(bookings));
  }

  return response;
};

// Get all Bookings for a Spot based on the Spot's id
export const getSpotBookingsRequest = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}/bookings`);
  console.log(response);
  if (response.ok) {
    let bookings = await response.json();
    bookings = bookings.Bookings; // see backend response
    dispatch(getSpotBookings(bookings));
  }

  return response;
};

// Create a Booking from a Spot based on the Spot's id
export const createBookingRequest = (data) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${data.spotId}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const booking = await response.json();
    dispatch(createBooking(booking));
  }

  return response;
};

// Delete booking
export const deleteBookingRequest = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    // const res = await response.json();
    dispatch(deleteBooking(bookingId));
  }

  return response;
};

//Edit a booking
export const editBookingRequest = (booking) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${booking.id}`, {
    method: "PUT",
    headers: { "Content-Type": "applicatio n/json" },
    body: JSON.stringify(booking),
  });
  if (response.ok) {
    const editedBooking = await response.json();
    dispatch(editBooking(editedBooking));
    return editedBooking;
  }
  return response;
};

let initialState = {};

const bookingsReducer = (state = initialState, action) => {
  let newState = {};
  switch (action.type) {
    case GET_ALL_BOOKINGS: {
      action.bookings.forEach((booking) => {
        newState[booking.id] = booking;
      });
      return { ...newState };
    }

    case GET_CURRENT_USER_BOOKINGS: {
      action.bookings.forEach((booking) => {
        newState[booking.id] = booking;
      });
      return { ...newState };
    }

    case CREATE_BOOKING: {
      newState = { ...state };
      newState[action.booking.id] = action.booking;
      return newState;
    }

    case DELETE_BOOKING: {
      newState = { ...state };
      delete newState[action.bookingId];
      return newState;
    }

    case EDIT_BOOKING: {
      newState = { ...state };
      newState[action.booking.id] = action.booking;
      return newState;
    }

    default:
      return state;
  }
};

export default bookingsReducer;

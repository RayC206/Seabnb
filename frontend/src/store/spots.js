import { csrfFetch } from "./csrf";

const GET_SPOT = 'spots/get-spot'
const GET_ALL_SPOTS = 'spots/get-all-spots'
const CREATE_SPOT = 'spots/create-spot'
const EDIT_SPOT = 'spots/EDIT-spot'
const DELETE_SPOT = 'spots/delete-spot'

const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    spot
  };
};

const getAll = (spots, spotsId) => {
  return {
    type: GET_ALL_SPOTS,
    spots,
    spotsId
  };
};

const createSpot = (spot) => {
  return {
    type: CREATE_SPOT,
    spot
  };
};

const editSpot = (spot) => {
  return {
    type: EDIT_SPOT,
    spot,
  };
};

const deleteSpot = (spot) => {
  return {
    type: DELETE_SPOT,
    spot
  }
}

//Get a spot
export const getASpot = (id) => async (dispatch) => {
  const response = await fetch (`/api/spots/${id}`)
  if (response.ok) {
    const spot = await response.json();
    dispatch(getSpot(spot));
    return spot;
  }
}

//Get all spots
export const getAllSpots = () => async (dispatch) => {
  const response = await fetch (`/api/spots/`)
  if (response.ok) {
    const spots = await response.json();
    dispatch(getAll(spots));
    return spots;
  }
}

//Create a Spot
export const createLocation = (data) => async dispatch => {
  const response = await csrfFetch(`/api/spots/`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
  });

  if (response.ok) {
      const spot = await response.json();
      dispatch(createSpot(spot));
      return spot;
  }
};

//Edit a Spot

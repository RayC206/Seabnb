import { csrfFetch } from "./csrf";

const GET_SPOT = "spots/get-spot";
const GET_ALL_SPOTS = "spots/get-all-spots";
const CREATE_SPOT = "spots/create-spot";
const EDIT_SPOT = "spots/update-spot";
const DELETE_SPOT = "spots/delete";
const GET_USER_SPOTS = "spots/get-user-spots";

const getAll = (spots) => {
  return {
    type: GET_ALL_SPOTS,
    spots,
  };
};

const getSpot = (spot) => {
  return {
    type: GET_SPOT,
    spot,
  };
};

const usersSpots = (spots) => {
  return {
    type: GET_USER_SPOTS,
    spots,
  };
};

const createSpot = (spot) => ({
  type: CREATE_SPOT,
  spot,
});

const editSpot = (spot) => ({
  type: EDIT_SPOT,
  spot,
});

const deleteSpot = (deleteResponse) => ({
  type: DELETE_SPOT,
  deleteResponse,
});

//Get all spots
export const getAllSpots = () => async (dispatch) => {
  console.log("get all spots");
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const spots = await response.json();
    dispatch(getAll(spots));
    // const all = {};
    // spots.forEach((spot) => (all[spot.id] = spot));
    // return { ...all };
    return spots;
  }
};

//Get a spot
export const findASpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`);
  if (response.ok) {
    const spot = await response.json();
    dispatch(getSpot(spot));
  }

  return response;
};

export const getUsersSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/users/current-user/spots");
  if (response.ok) {
    const allSpots = await response.json();
    dispatch(usersSpots(allSpots));
    return allSpots;
  }
  return response;
};

//Create a spot
export const createNewSpot = (data) => async (dispatch) => {
  console.log(data);
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  console.log(response);
  if (response.ok) {
    const spot = await response.json();
    dispatch(createSpot(spot));
    return spot;
  }
};

// Edit spot
export const editASpot = (data, spotId) => async (dispatch) => {
  console.log(spotId);
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const updatedSpot = await response.json();
    dispatch(editSpot(updatedSpot));
    return updatedSpot;
  }
};

//Delete spot
export const spotDelete = (spotId, userId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    const deleteResponse = await response.json();
    dispatch(deleteSpot(deleteResponse));
    return deleteResponse;
  }
};

// Reducer
const initialState = {};
const spotsReducer = (state = initialState, action) => {
  console.log("ACTION");
  console.log(action);
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const allSpots = action.spots;
      // action.spots.forEach((spot) => (allSpots[spot.id] = spot));
      return { ...allSpots };
    }
    case GET_SPOT: {
      const spot = action.spot;
      return { ...spot, ...state };
    }
    case GET_USER_SPOTS: {
      const newState = {};
      action.spots.forEach(spot => newState[spot.id] = spot);
      let allSpots = {...newState};
      return allSpots;
    }
    case CREATE_SPOT: {
      return { ...state };
    }
    case EDIT_SPOT: {
      return { ...state };
    }
    case DELETE_SPOT:
      const deleteResponse = action.deleteResponse;
      if (deleteResponse.statusCode === 200) {
        return [];
      }


    default:
      return state;
  }
};

export default spotsReducer;

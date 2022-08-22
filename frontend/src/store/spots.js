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

const deleteSpot = (deleteResponse, deletedSpotId) => ({
  type: DELETE_SPOT,
  deleteResponse,
  deletedSpotId,
});

//Get all spots
export const getAllSpots = () => async (dispatch) => {
  const response = await csrfFetch("/api/spots");
  if (response.ok) {
    const spots = await response.json();
    console.log("SPOTS FETCH");
    console.log(spots);
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
  const response = await csrfFetch("/api/spots", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const spot = await response.json();
    dispatch(createSpot(spot));
    return spot;
  }
};

// Edit spot
export const editASpot = (data, spotId) => async (dispatch) => {
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
    dispatch(deleteSpot(deleteResponse, spotId));
    return deleteResponse;
  }
};

// Reducer
const initialState = {};
const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_SPOTS: {
      const allSpots = action.spots;
      // action.spots.forEach((spot) => (allSpots[spot.id] = spot));
      return { ...allSpots };
    }
    case GET_SPOT: {
      const spot = action.spot;
      return { ...spot };
    }
    case GET_USER_SPOTS: {
      const newState = {};
      action.spots.forEach((spot) => (newState[spot.id] = spot));
      let allSpots = { ...newState };
      return allSpots;
    }
    case CREATE_SPOT: {
      return { ...state };
    }
    case EDIT_SPOT: {
      console.log("STATE");
      console.log(state);
      return { ...state };
    }
    case DELETE_SPOT:
      console.log(state);
      console.log(Object.keys(state));
      console.log(action.deletedSpotId);
      let newState = Object.keys(state)
        .filter((spotId) => { // filter out deleted spot -- only return if spotid is not the deletedspotid
          spotId = Number(spotId);
          return spotId !== action.deletedSpotId;
        })
        .reduce((obj, key) => { // transform array to object key-value pair bec state has to be an object
          obj[key] = state[key];
          return obj;
        }, {});
      console.log(newState);
      return { ...newState };
    // const deleteResponse = action.deleteResponse;
    // if (deleteResponse.statusCode === 200) {
    // return [
    //   ...state.filter((spot) => {
    //     return spot.id !== action.deletedSpotId;
    //   }),
    // ];
    // }
    // return { ...state };

    default:
      return state;
  }
};

export default spotsReducer;

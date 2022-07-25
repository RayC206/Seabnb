import { csrfFetch } from "./csrf";

const GET_SPOT = "spots/get-spot";
const GET_ALL_SPOTS = "spots/get-all-spots";


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


//Get all spots
export const getAllSpots = () => async (dispatch) => {
  const response = await fetch(`/api/spots`);
  if (response.ok) {
    const spotsObj = await response.json();
    // console.log(typeof roomsObj.Rooms)
    dispatch(getAll(spotsObj.Spots))
  }
  return response;
};


//Get a spot
export const findASpot = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}`)
  if (response.ok) {
    const spot = await response.json()
    dispatch(getSpot(spot))
  }
  return response;
};



const initialState = {}
const spotsReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case GET_ALL_SPOTS: {
      for (let spot of action.spots) newState[spot.id] = spot
      return { ...state, ...newState };
    }
    case GET_SPOT: {
      newState[action.spot.id] = action.spot;
      return {...state, ...newState}
    }
    default:
      return state;
  }
}

export default spotsReducer;

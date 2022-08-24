import { csrfFetch } from "./csrf";

const ADD_IMAGES = 'images/add-image'
const REMOVE_IMAGE ='images/delete'

const addImage = (image) => ({
  type: ADD_IMAGES,
  image
});


export const addSpotImage = (spotId, image) => async (dispatch) => {
  // const { userId, spotId, url} = image
  const response = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: "POST",
    header: {"Content-Type": "application/json" },
    body: JSON.stringify(image)
  });
  if (response.ok) {
    const newImage = await response.json()
    dispatch(addImage(newImage));
    return newImage
  };
};

const initialState = {}
const imageReducer = (state = initialState, action) => {
  const newState = {...state}
  switch (action.type) {
    case ADD_IMAGES: {
      newState[action.image.id] = action.image;
      return newState;
    };
    default:
    return state;
  }
};


export default imageReducer;

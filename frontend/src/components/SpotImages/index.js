import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deleteSpotImage, findASpot } from "../../store/spots";
import "../CSS/SpotImages.css";


const SpotImages = () => {
  let { spotId } = useParams();
  spotId = Number(spotId);
  const spot = useSelector((state) => state.spots);
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [findASpotStatus, setFindASpotStatus] = useState(200);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageFormModalIsOpen, setImageFormModalIsOpen] = useState(false);

  // console.log(spot);

  useEffect(() => {
    dispatch(findASpot(spotId)).catch(async (res) => {
      setFindASpotStatus(res.status);
    });
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(spot).length && spot.id) {
      setIsLoaded(true);
    }
  }, [spot]);

  const handleDelete = (e, imageId) => {
    e.preventDefault();
    dispatch(deleteSpotImage(spot, imageId)).then(() => {
      let path = `/spots/${spot.id}/images`;
      console.log(path);
      history.push(path);
    });
  };

  if (isLoaded) {
    if (findASpotStatus === 200) {
      return (
        <div className="imagePageContainer">
          <button className="backButton" onClick={history.goBack}>
            Go Back
          </button>
          <div className="imagePage-grid">
            <img
              className="imagePage-grid-col-2 imagePage-grid-row-2"
              src={spot.previewImage}
              alt={spot.name}
            ></img>
            {spot.images.map((image) => {
              return (
                <>
                  <img
                    className=""
                    key={image.id}
                    src={image.url}
                    alt={spot.name}
                  ></img>
                  <button
                    className="deleteButton"
                    onClick={(e) => handleDelete(e, image.id)}
                  >
                    Delete
                  </button>
                </>
              );
            })}
          </div>
        </div>
      );
    } else if (findASpotStatus === 404) {
      return (
        <div className="fourOhFour">
          <a className="fourOh">404: Spot not found</a>
        </div>
      );
    }
  } else {
    return <div>Loading... </div>;
  }
};

export default SpotImages;

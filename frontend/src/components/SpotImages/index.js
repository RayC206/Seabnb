import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { deleteSpotImage, findASpot } from "../../store/spots";
import { FaTrashAlt } from "react-icons/fa";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
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
  const viewingAsOwner = sessionUser && sessionUser.id === spot.ownerId;
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =
    useState(false);
  const [deletedImageId, setDeletedImageId] = useState(null);

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
    setShowDeleteConfirmationModal(true);
    setDeletedImageId(imageId);
  };

  const confirmDelete = () => {
    dispatch(deleteSpotImage(spot, deletedImageId)).then(() => {
      let path = `/spots/${spot.id}/images`;
      history.push(path);
      setShowDeleteConfirmationModal(false);
    });
  };

  const spotsPage = () => {
    let route = `/spots/${spot.id}`;
    history.push(route);
  };

  const imageFormPage = () => {
    let route = `/spots/${spot.id}/images/add-image`;
    history.push(route);
  };

  if (isLoaded) {
    if (findASpotStatus === 200) {
      if (viewingAsOwner) {
        return (
          <>
            <DeleteConfirmationModal
              isOpen={showDeleteConfirmationModal}
              onClose={() => setShowDeleteConfirmationModal(false)}
              onConfirm={confirmDelete}
            />
            <div className="imagePageContainer">
              <div className="imagePageButtons">
                <button className="backButton" onClick={spotsPage}>
                  Go Back
                </button>
                <button className="backButton" onClick={imageFormPage}>
                  Add Image
                </button>
              </div>
              <div>
                <h1></h1>
                {spot.images.map((image) => {
                  return (
                    <div className="imageGridContainer">
                      <div className="imagePage-grid">
                        <img
                          className=""
                          key={image.id}
                          src={image.url}
                          alt={spot.name}
                        ></img>
                        <FaTrashAlt
                          className="deleteButton"
                          onClick={(e) => handleDelete(e, image.id)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        );
      } else {
        return (
          <div className="imagePageContainer">
            <div className="imagePageButtons">
              <button className="backButton" onClick={history.goBack}>
                Go Back
              </button>
            </div>
            <div className="imagePage-grid2">
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
                  </>
                );
              })}
            </div>
          </div>
        );
      }
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

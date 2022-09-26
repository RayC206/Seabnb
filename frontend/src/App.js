import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormModal from "./components/LoginFormModal";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotDetail from "./components/SpotDetail";
import SpotsPage from "./components/Spots";
import CreateSpot from "./components/CreateSpot";
import EditSpot from "./components/EditSpot";
import UserSpots from "./components/UserSpots";
import Homepage from "./components/Homepage";
import CreateReview from "./components/CreateReview";
import UserReviews from "./components/UsersReviews";
import SpotImages from "./components/SpotImages";
import ImageForm from "./components/ImageForm/ImageForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/login">
            <LoginFormModal isOpen={true} modalToggle={() => {}} />
          </Route>
          <Route exact path="/spots/">
            <SpotsPage />
          </Route>
          <Route exact path="/spots/create">
            <CreateSpot />
          </Route>
          <Route exact path="/spots/:spotId/edit">
            <EditSpot />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetail />
          </Route>
          <Route exact path="/my-spots">
            <UserSpots />
          </Route>
          <Route exact path="/my-reviews">
            <UserReviews />
          </Route>
          <Route exact path="/spots/:spotId/create-review">
            <CreateReview />
          </Route>
          <Route exact path="/spots/:spotId/images">
            <SpotImages />
          </Route>
          <Route exact path="/spots/:spotId/images/add-image">
            <ImageForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

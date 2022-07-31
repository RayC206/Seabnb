import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";

import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  console.log("Navigation");
  console.log(sessionUser);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div id="rightNav">
          <ProfileButton user={sessionUser} />
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <div id="rightNav">
        <LoginFormModal />
        <button>
          <NavLink to="/signup">Sign Up</NavLink>
        </button>
      </div>
    );
  }
  return (
    <nav>
      <div id="navBar">
        <div id="logo_div">
          <NavLink exact to="/">
            <img src="https://i.imgur.com/pd6aZpK.png"></img>
          </NavLink>
        </div>
        {isLoaded && sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;

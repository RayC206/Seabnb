import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";

import "./Navigation.css";
import CreateSpotModal from "../CreateSpot";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
    <div id='rightNav'>
    {/* <NavLink to="/spots">Spots</NavLink> */}
    <ProfileButton user={sessionUser}/>
    {/* <NavLink to="/spots/create">Create Spot</NavLink> */}

    </div>
      </>
    )
  } else {
    sessionLinks = (

      <div id='rightNav'>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
        <NavLink to="/spots">Spots</NavLink>
      </div>

    );
  }

  return (
    <nav>
    <div id="navBar">
        <div id='logo_div'>
            <NavLink exact to="/">
                <img src="https://cdn141.picsart.com/303177257018211.png"></img>
            </NavLink>
        </div>
        {isLoaded && sessionLinks}
    </div >


</nav >
  );
}

export default Navigation;

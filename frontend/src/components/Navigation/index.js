import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";

import "../CSS/Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [loginFormModalIsOpen, setLoginFormModalIsOpen] = useState(false);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <div id="rightNav">
          <NavLink className='hostSpot' to='/spots/create'>Become a Host</NavLink>
          <ProfileButton user={sessionUser} />
        </div>
      </>
    );
  } else {
    sessionLinks = (
      <div id="rightNav">
        <button onClick={() => setLoginFormModalIsOpen(true)}>Log In</button>
        <LoginFormModal
          isOpen={loginFormModalIsOpen}
          modalToggle={setLoginFormModalIsOpen}
        />
        <button className="signUpButton">
          <Link to="/signup">Sign Up</Link>
        </button>
      </div>
    );
  }
  return (
    <nav>
      <div id="navBar">
        <div id="logo_div">
          <NavLink exact to="/">
            <img src="https://i.imgur.com/pd6aZpK.png" alt="Seabnb Logo"></img>
          </NavLink>
        </div>
        {isLoaded && sessionLinks}
      </div>
    </nav>
  );
}

export default Navigation;

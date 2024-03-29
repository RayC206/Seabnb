import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { Link, useHistory } from "react-router-dom";
import { FaUserCircle, FaBars } from "react-icons/fa";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  // const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
    <>
      <nav className="profileDropdownDiv">
        <button className="profileDropdown" onClick={openMenu}>
          <div className="menu_drop">
            <FaBars />
          </div>
          <div className="user_icon">
            <FaUserCircle />
          </div>
        </button>
        {showMenu && (
          <div id="menu">
            <div className="loggedInUser"> {`Hello, ${user.username}`}</div>
            {/* <div className="dividerDropdown"></div> */}
            <Link
              className="createSpotDropdown"
              to="/spots/create"
              id="dropDown1"
            >
              Host your home
            </Link>
            <Link to="/my-spots" id="dropDown1">
              Manage Listings
            </Link>
            <Link to="/my-bookings" id="dropDown1">
              Manage Bookings
            </Link>
            <Link to="/my-reviews" id="dropDown1">
              Manage Reviews
            </Link>
            <div onClick={logout} id="dropDown2">
              Log out
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

export default ProfileButton;

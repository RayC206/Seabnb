import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link, useHistory  } from "react-router-dom";
import { FaUserCircle, FaBars} from 'react-icons/fa';


function ProfileButton({user}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/")
  };

  return (
    <>
     <div className="button">
      <button className="profileDropdown" onClick={openMenu}>
        <div className="menu_drop"><FaBars/></div>
        <div className="user_icon"><FaUserCircle/></div>
      </button>
      {showMenu && (
        <div id="menu">
          <div> {`Hello, ${user.username}`}  </div>
          <Link to="/spots/create" id="dropdown1">
            Create a Spot
          </Link>
          <Link to="/my-spots" id="dropdown1">
            My Spots
          </Link>
          <Link to="/my-reviews" id="dropdown1">
            My Reviews
          </Link>
          <div onClick={logout} id="dropdown2">
            Log out
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default ProfileButton;

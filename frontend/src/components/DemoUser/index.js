import React from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "../CSS/DemoUser.css";

function DemoUser({ modalToggle }) {
  const dispatch = useDispatch();

  const loginDemo = (e) => {
    e.preventDefault();
    const email = "demo@user.io";
    const password = "password";
    return dispatch(sessionActions.login({ email, password })).then(() => {
      modalToggle(false);
    });
  };

  return (
    <button className="demoLoginButton" onClick={loginDemo}>
      Demo User
    </button>
  );
}

export default DemoUser;

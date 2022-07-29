import React from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function DemoUser() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = "demo@user.io";
    const password = "password";
    return dispatch(sessionActions.login({ email, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Demo User</button>
    </form>
  );
}

export default DemoUser

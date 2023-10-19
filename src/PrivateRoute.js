import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const auth = getAuth();
  let user = null;

  onAuthStateChanged(auth, (authUser) => {
    user = authUser;
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;

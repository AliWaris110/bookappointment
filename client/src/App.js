import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Router, Switch, Route, Redirect, useLocation } from "react-router-dom";
import { history } from "./helpers/history";

import LoginToggle from "./login-toggle/loginToggle";
import ForgotPassword from "./forgot-password/forgotPassword";
import VerifyEmail from "./verify-email/verify-email";
import UserIndex from "./UserPanel/components/UserIndex";
import AdminIndex from "./AdminPanel/AdminIndex";

import Users from "./AdminPanel/Admin/users";
const App = () => {
  const [expTime, setExpTime] = useState(false);
  const { user: currentUser, isLoggedin } = useSelector((state) => state.auth);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      console.log("Error in parseJwt: ", e);
      return null;
    }
  };
  useEffect(() => {
    // const expTime = parseJwt(currentUser?.jwtToken);

    // if (currentUser && expTime && new Date(expTime.exp * 1000) < Date.now()) {
    //   localStorage.removeItem("user");
    //   window.location.reload();
    //   setExpTime(true);
    // }
  }, []);
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/login" component={LoginToggle} />
        <Route exact path="/register" component={LoginToggle} />
        <Route path="/forgot-password" component={ForgotPassword} />
        <Route path="/verify-email" component={VerifyEmail} />

        {currentUser?.user?.role === "admin" && (
          <Route path="/admin" component={AdminIndex} />
        )}

       

        {currentUser?.user?.role === "admin" && (
         <Switch>
            <Route path="/users" component={Users} />
            <Route path="/user" component={UserIndex} />
            </Switch>
        
        )}

        {/* <Redirect from='/' to='/user'/> */}
        {(!currentUser || currentUser?.user?.role === "user") && (
         
            <Route path="/user" component={UserIndex} />
         
        )}
        {
          (!currentUser || expTime) && (
            <Redirect to="/user"/>
          )
        }
      </Switch>
    </Router>
  );
};

export default App;

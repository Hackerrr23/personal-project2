import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import SignUp from "./components/Register/Register";
import SignIn from "./components/Login/Login";
import Home from "./components/Home/Home";
import UserProfile from "./components/UserProfile/UserProfile";
import CurrentUser from "./components/CurrentUser/CurrentUser";
import UserInfo from "./components/UserInfo/UserInfo";

export default (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/signup" component={SignUp} />
    <Route path="/signin" component={SignIn} />
    <Route path="/home" component={Home} />
    <Route path="/users/:id" component={UserProfile} />
    <Route path="/mypref" component={UserInfo} />
    <Route path="/current" component={CurrentUser} />
  </Switch>
);

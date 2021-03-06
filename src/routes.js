import React from "react";
import { Switch, Route } from "react-router-dom";

import Dashboard from "./components/Dashboard/Dashboard";
import SignUp from "./components/Register/Register";
import SignIn from "./components/Login/Login";
import Home from "./components/Home/Home";
import UserProfile from "./components/UserProfile/UserProfile";
import CurrentUser from "./components/CurrentUser/CurrentUser";
import UserInfo from "./components/UserInfo/UserInfo";
import Posts from "./components/Posts/CreatePost";
import Notifications from "./components/Notifications/Notifications";
import Flip from "./components/Flip/Flip";

export default (
  <Switch>
    <Route exact path="/" component={Dashboard} />
    <Route path="/signup" component={SignUp} />
    <Route path="/signin" component={SignIn} />
    <Route path="/home" component={Home} />
    <Route path="/users/:id" component={UserProfile} />
    <Route path="/mypref" component={UserInfo} />
    <Route path="/current" component={CurrentUser} />
    <Route path="/posts" component={Posts} />
    <Route path="/notifications" component={Notifications} />
    <Route path="/flip" component={Flip} />
  </Switch>
);

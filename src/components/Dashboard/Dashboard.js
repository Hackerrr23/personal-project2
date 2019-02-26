import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export class Dashboard extends Component {
  render() {
    return (
      <div className="dash-bod">
        <img className="dash-pic" src="https://www.rentcafe.com/blog/wp-content/uploads/2018/09/roommates-apps-featured.jpg" />
  
       <div className="main">
          <h1>Life's Too Short To Not Have A Coolmate</h1>
           <p>Find Your Perfect Match Today</p>
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>
              <Link to="/signin">
                <button>Sign In</button>
              </Link>
          </div>
        </div>
    );
  }
}

export default Dashboard;

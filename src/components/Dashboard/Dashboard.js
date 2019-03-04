import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export class Dashboard extends Component {
  render() {
    return (
      <div className="dash-bod">
        <img className="dash-pic" src="https://images.unsplash.com/photo-1547211453-719b1bdec5f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" />
  
       <div className="main">
          <h1>Life's Too Short To Not Have A Coolmate</h1>
           <p>Find Your Perfect Match Today</p>
              <Link to="/signup">
                <button className="btn-comments" id="up">Sign Up</button>
              </Link>
              <Link to="/signin">
                <button className="btn-comments in">Sign In</button>
              </Link>
          </div>
        </div>
    );
  }
}

export default Dashboard;

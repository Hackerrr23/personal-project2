import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

export class Dashboard extends Component {
  render() {
    return (
      <div>
        <main>
          <h1>Life's Too Short To Not Have A Coolmate</h1>
          <p>Find Your Perfect Match Today</p>
        </main>
        <Link to="/signup">
          <button>Sign Up</button>
        </Link>
        <Link to="/signin">
          <button>Sign In</button>
        </Link>
      </div>
    );
  }
}

export default Dashboard;

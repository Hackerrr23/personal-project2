import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { connect } from "react-redux";

class Header extends Component {
  render() {
    console.log(this.props);
    
    return (
      <div>
        <nav>
          <section>
            <i className="fas fa-house-damage" />
            <Link to="/">
              <h1>ROOMIES</h1>
            </Link>
            <span>Find Your Perfect Roomate</span>
          </section>
          {this.props.user.username ? (
          <>
            <ul>
              <li>See Others</li>
              <li>Your Profile</li>
              <li>Postings</li>
            </ul>
          </>
          ) : (<p>test</p>
          )}
        </nav>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const {user} = state.reducer
  console.log(state)
  return {user}
};

export default connect(mapStateToProps)(Header);

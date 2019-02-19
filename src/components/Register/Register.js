import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  register,
  updatePassword,
  updateUsername,
  updateEmail
} from "../../ducks/userReducer";

export class Register extends Component {
  addAndClear = () => {
    const { username, password, user, email } = this.props;
    this.props.register(username, password, email);
    console.log(username, password, email);
  };
  render() {
    console.log(this.props);
    return (
      <form>
        <h5>Sign Up</h5>

        <label htmlFor="neme">UserName</label>
        <input
          type="text"
          value={this.props.username}
          onChange={e => this.props.updateUsername(e.target.value)}
        />

        <label htmlFor="place">Password</label>
        <input
          type="text"
          value={this.props.password}
          onChange={e => this.props.updatePassword(e.target.value)}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={this.props.email}
          onChange={e => this.props.updateEmail(e.target.value)}
        />

        <Link to="/mypref">
          <button onClick={() => this.addAndClear()}>
            Confirm and Complete
          </button>
        </Link>
      </form>
    );
  }
}
const maptStateToProps = state => {
  const { username, password, email } = state.reducer;
  return {
    username,
    password,
    email
  };
};

export default connect(
  maptStateToProps,
  { register, updatePassword, updateUsername, updateEmail }
)(Register);

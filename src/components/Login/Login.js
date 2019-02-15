import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  login,
  updatePassword,
  updateUsername,
  updateEmail
} from "../../ducks/userReducer";

export class Login extends Component {
  render() {
    const addAndClear = () => {
      const { username, password, email } = this.props;
      console.log(username, password, email);
      this.props.login(username, password, email);
      // console.log(user)
    };
    console.log(this.props);
    return (
      <form>
        <h5>Sign In</h5>

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
          <button onClick={() => addAndClear()}>Confirm and Complete</button>
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
  { login, updatePassword, updateUsername, updateEmail }
)(Login);

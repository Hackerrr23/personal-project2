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
      // console.log(username, password, email);
      this.props.login(username, password, email);
      // console.log(user)
    };
    // console.log(this.props);
    return (
      <div class="form-style-6">
          <h1>Sign In</h1>
          <form>
          <input type="text" name="field1" placeholder="User Name"
          value={this.props.username}
          onChange={e => this.props.updateUsername(e.target.value)}
           />
          <input type="text" name="field1" placeholder="Password"
          value={this.props.password}
          onChange={e => this.props.updatePassword(e.target.value)}
           />
          <Link to="/home">
          <input type="submit" onClick={() => addAndClear()} value="Login" />
        </Link>
          </form>
      </div>
    );
  }
}
const maptStateToProps = state => {
  const { username, password, email, user } = state.reducer;
  return {
    username,
    password,
    email,
    user
  };
};

export default connect(
  maptStateToProps,
  { login, updatePassword, updateUsername, updateEmail }
)(Login);
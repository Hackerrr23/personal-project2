import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { connect } from "react-redux";
import axios from "axios";
import {
  register,
  updatePassword,
  updateUsername,
  updateEmail,
  updateProfile
} from "../../ducks/userReducer";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      username: "",
      password: "",
      email: "",
      user: {}
    };
    //  this.addAndClear = this.addAndClear.bind(this);
  }
  addAndClear = () => {
    const { username, password, email } = this.props;
    this.props.register(username, password, email);
    this.submitFile();
  };
  submitFile = () => {
    const formData = new FormData();
    formData.append("file", this.state.image[0]);
    axios
      .post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        axios
          .post(`/api/image`, { image: response.data.Location })
          .then(res => {
            console.log(res.data);
            // this.props.profile_pic =  response.data.Location
            this.props.updateProfile(res.data);
          });
        // console.log(this.props.user)
        // console.log(response.data.Location)
        // console.log(response.props.profile_pic)
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleFileUpload = event => {
    // console.log(event.target.files)
    this.setState({ image: event.target.files });
  };
  render() {
    // console.log(this.state.image);
    const { username, password, email } = this.props;
    return (
      <div class="form-style-6">
        <form>
          <div className="h1">
            <h1>Sign Up</h1>
          </div>
          <i class="fas fa-lock" />
          <input
            type="text"
            name="field1"
            placeholder="User Name"
            value={username}
            onChange={e => this.props.updateUsername(e.target.value)}
          />
          <input
            id="passy"
            type="password"
            name="field1"
            placeholder="Password"
            value={password}
            onChange={e => this.props.updatePassword(e.target.value)}
          />
          <input
            type="email"
            name="field2"
            placeholder="Email Address"
            value={email}
            onChange={e => this.props.updateEmail(e.target.value)}
          />
          <h2>
            Your profile pic:
            <input
              label="upload file"
              type="file"
              onChange={this.handleFileUpload}
            />
          </h2>

          <Link to="/mypref">
            <input
              type="submit"
              onClick={() => this.addAndClear()}
              value="Register"
            />
          </Link>
        </form>
      </div>
    );
  }
}
const maptStateToProps = state => {
  const { username, password, email, user, profile_pic } = state.reducer;
  return {
    username,
    password,
    email,
    profile_pic,
    user
  };
};

export default connect(
  maptStateToProps,
  { register, updatePassword, updateUsername, updateEmail, updateProfile }
)(Register);

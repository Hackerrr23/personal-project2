import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Register"
import { connect } from "react-redux";
import axios from "axios"
import {
  register,
  updatePassword,
  updateUsername,
  updateEmail
} from "../../ducks/userReducer";

 class Register extends Component {
   constructor(props){
     super(props)
     this.state = {
       image: null,
       username: "",
       password: "",
       email: ""
     }
   }
  addAndClear = () => {
    const { username, password, email } = this.state;
   axios.post("/api/register",{username,password,email}).then(res => {
     console.log("redirect")
     console.log(res)
     this.submitFile(res.data.id)
   })
    console.log(username, password, email);
  };
  submitFile = ( id) => {
    console.log(id)
    // event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.image[0]);
    axios.post("/api/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      
      axios.post("/api/image", { image: response.data.Location, id});
    }).catch(error => {
       console.log(error)
    });
  }

  handleFileUpload = (event) => {
    this.setState({image: event.target.files});
  }
  render() {
    console.log(this.state.image);
    return (
      <form>
        <h5>Sign Up</h5>

        <label htmlFor="neme">UserName</label>
        <input
          type="text"
          value={this.state.username}
          onChange={e => this.setState({username:e.target.value})}
        />

        <label htmlFor="place">Password</label>
        <input
          type="text"
          value={this.state.password}
          onChange={e => this.setState({password:e.target.value})}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={this.state.email}
          onChange={e => this.setState({email:e.target.value})}
        />
        {this.state.image ? <img src={this.state.image[0].name} alt=""/> :null} 

        <Link to="/mypref">
          <button onClick={() => this.addAndClear()}>
            Confirm and Complete
          </button>
        </Link>
        <input label='upload file' type='file' onChange={this.handleFileUpload} />
          {/* <button type='submit' onClick={this.submitFile}>>Send</button> */}
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

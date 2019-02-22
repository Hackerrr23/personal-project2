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
       email: "",
       user: {}
     }
    //  this.addAndClear = this.addAndClear.bind(this);
   }
     addAndClear =  () => {
    const { username, password, email } = this.props;
     this.props.register(username, password, email) 
      this.submitFile() 
     
  //  axios.post("/api/register",{username,password,email}).then(res => {
  //    console.log("redirect")
  //    console.log(res)
  //    this.setState({
  //      user: res.data
  //    })
  //    console.log(this.state.user)
  //  }).catch(error => console.log(error))
  //   console.log(username, password, email);
  };
  submitFile = () => {
    // console.log(id)
    // event.preventDefault();
    const formData = new FormData();
    formData.append('file', this.state.image[0]);
    axios.post("/api/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
    
      
      axios.post(`/api/image`, { image: response.data.Location});
      console.log(response.data.Location)
    }).catch(error => {
       console.log(error)
    });
  }

  handleFileUpload = (event) => {
    console.log(event.target.files)
    this.setState({image: event.target.files});
  }
  render() {
    // console.log(this.state.image);
    const {username,password,email} = this.props
    return (
      <form>
        <h5>Sign Up</h5>

        <label htmlFor="neme">UserName</label>
        <input
          type="text"
          value={username}
          onChange={e => this.props.updateUsername(e.target.value)}
        />

        <label htmlFor="place">Password</label>
        <input
          type="text"
          value={password}
          onChange={e => this.props.updatePassword(e.target.value)}/>

        <label htmlFor="email">Email</label>
        <input
          type="text"
          value={email}
          onChange={e => this.props.updateEmail(e.target.value)}/>

        {this.state.image ? <img src={this.state.image[0].name} alt=""/> :null} 

        <h2>Your profile pic:<input label='upload file' type='file' onChange={this.handleFileUpload} /></h2>
        <Link to="/mypref">
          <button onClick={() => this.addAndClear()}>
            Confirm and Complete
          </button>
        </Link>
          {/* <button type='submit' onClick={this.submitFile}>>Send</button> */}
      </form>
    );
  }
}
const maptStateToProps = state => {
  const { username, password, email,user } = state.reducer;
  return {
    username,
    password,
    email,
    user
  };
};

export default connect(
  maptStateToProps,
  { register, updatePassword, updateUsername, updateEmail }
)(Register);

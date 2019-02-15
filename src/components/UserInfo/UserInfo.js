import React, { Component } from "react";
import { connect } from "react-redux";
import { insertPref } from "../../ducks/userReducer";
import {Link} from 'react-router-dom'
class UserInfo extends Component {
  constructor(props) {

    super(props);
    this.state = { 
       rooms: "One Room",
       gender: "Male",
       smoke: "",
       pets: "Cat",
       profession: "",
       bio: ""
     };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  // handleRooms = event => {
  //   this.setState({ rooms: event.target.value });
  // };

  handleSubmit = event => {
    event.preventDefault();
    const {user} = this.props
    
    const {rooms,gender,smoke,pets,profession,bio} = this.state
    
    // alert("Your favorite flavor is: " + this.state.value);
    
    this.props.insertPref(rooms,gender,smoke,pets,profession,bio,user.id);
  };
  
  render() {
  
    // const {user} = this.props
    console.log(this.props.user)
    const {rooms,gender,smoke,pets,profession,bio} = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Number of Rooms You're Looking For:
          <select value={rooms} name="rooms" onChange={this.handleChange}>
            <option value="One Room">One Room</option>
            <option value="Two Rooms">Two Rooms</option>
            <option value="Three Rooms">Three Rooms</option>
            <option value="Four Rooms">Four Bedroom</option>
          </select>
        </label>

         <label>
          Your Gender:
          <select value={gender} name="gender" onChange={this.handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        <label>
          Do You Smoke:
            <input name="smoke" value={smoke} onChange={this.handleChange} type="text"/>
          </label>

            <label>
          Have Any Pets?..
          <select value={pets} name="pets" onChange={this.handleChange}>
            <option value="Cats">Cat</option>
            <option value="Elephant">Elephant</option>
            <option value="Dog">Dog</option>
            <option value="Turtle">Turtle</option>
            <option value="More Cats">More Cats</option>
            <option value="">Rabbit</option>
          </select>
          <label>
          Your Profession:
            <input placeholder="What Do you do" name="profession" onChange={this.handleChange} value={profession} type="text"/>
          </label>
        </label>
        <textarea placeholder="A little more about yourself and your ideal roomate" onChange={this.handleChange} value={bio} name="bio" id="" cols="30" rows="10"></textarea>
        <Link to="/current"><button onClick={this.handleSubmit}>Submit</button></Link>
      </form>
    );
  }
}
const mapStateToProps = state => {
  const { pref,user } = state.reducer;
  return { pref,user };
};

export default connect(
  mapStateToProps,
  { insertPref }
)(UserInfo);

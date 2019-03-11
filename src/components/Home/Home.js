import React, { Component } from "react";
import axios from "axios";
import "./Home.css";

import { Link } from "react-router-dom";
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      gender: "Male",
      type: "Need A Room",
      pets: ""
    };
  }

  componentDidMount() {
    axios.get("/api/users").then(res => {
      // console.log(res.data);
      this.setState({
        users: res.data
      });
    });
  }
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleClick = () => {
    const { gender, type, pets } = this.state;
    axios.get(`/api/filtered?gender=${gender}&pets=${pets}`).then(res => {
      // console.log(res);
      this.setState({
        users: res.data
      });
    });
  };
  render() {
    const { gender, type, pets } = this.state;
    const usersList = this.state.users.map((user, id) => {
      // console.log(user.profile_pic);
      return (
        <div key={user.id} className="card2">
          <div className="container2">
          <img src={user.profile_pic} alt="Avatar"/>
           <div className="new">
           <Link to={`/users/${user.id}`}><h4><b>{user.username}</b></h4></Link>
            <p>{user.profession}</p> 
          </div>
          </div>
        </div>
        /* <div key={user.id} className="home1">
          <div className="home2" key={user.id}>
            <div className="users">
              <img className="pics" src={user.profile_pic} alt="" />
              <Link to={`/users/${user.id}`}>
                <h1>{user.username}</h1>
              </Link>
              <h3>{user.profession}</h3>
              {user.gender === "Male" || user.gender === "male" ? (
                <div>
                  <h5>{user.gender}</h5>
                  <i class="fas fa-male" />
                </div>
              ) : (
                <div>
                  <h5>{user.gender}</h5>
                  <i class="fas fa-female" />
                </div>
              )}
            </div>
          </div>
        </div> */
      );
    });

    return (
      <div>
        <div className="filter">
          <h4>Filter Potential Roomates</h4>
          <label>
            <span>I want to room with a </span>
            <select value={gender} name="gender" onChange={this.handleChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option> 
            </select>  
          </label>
          <label>
            who has a..
            <select value={pets} name="pets" onChange={this.handleChange}>
              <option value="Cats">Cat</option>
              <option value="Elephant">Elephant</option>
              <option value="Dog">Dog</option>
              <option value="Turtle">Turtle</option>
              <option value="More Cats">More Cats</option>
              <option value="">Rabbit</option>
            </select>
          </label>
          <button onClick={this.handleClick}>Filter</button>
        </div>
        <div  className="bigger">{usersList}</div>
      </div>
    );
  }
}

export default Home;

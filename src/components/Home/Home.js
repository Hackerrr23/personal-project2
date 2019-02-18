import React, { Component } from "react";
import axios from "axios";
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
      console.log(res.data);
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
      console.log(res);
      this.setState({
        users: res.data
      });
    });
  };
  render() {
    const { gender, type, pets } = this.state;
    const usersList = this.state.users.map((user, id) => {
      return (
        <div key={user.id}>
          <Link to={`/users/${user.id}`}>
            <h1>{user.username}</h1>
          </Link>
          <h3>{user.username}</h3>
          <h3>{user.gender}</h3>
        </div>
      );
    });
    console.log(this.state);
    console.log("sdfosdf");
    return (
      <div>
        Hey whats up how you doing
        <label>
          Your Gender:
          <select value={gender} name="gender" onChange={this.handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </label>
        {/* <label>
          Your Rooming Sitution:
          <select value={type} name="type" onChange={this.handleChange}>
            <option value="Need A Room">Need A Room</option>
            <option value="Have A Room">Have A Room</option>
          </select>
        </label> */}
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
        </label>
        <button onClick={this.handleClick}>Filter</button>
        {usersList}
      </div>
    );
  }
}

export default Home;

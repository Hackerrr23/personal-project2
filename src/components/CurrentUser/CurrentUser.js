import React, { Component } from "react";
import axios from "axios";
import "./CurrentUser.css";
import { connect } from "react-redux";
class CurrentUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pref: [],
      addOrEdit: false,
      rooms: "One Room",
      gender: "Male",
      smoke: "",
      pets: "Cat",
      profession: "",
      bio: ""
    };
  }
  componentDidMount() {
    const { user } = this.props;
    axios.get(`/api/current/${user.id}`).then(res => {
      console.log(user);
      console.log(res.data);
      this.setState({ pref: res.data });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.pref.length !== prevState.pref.length) {
      //   this.setState({
        const { user } = this.props;

      //     posts: this.state.posts
      //   });
      console.log("hit test");
      axios.get(`/api/current/${user.id}`).then(res => {
        console.log(res.data);
        this.setState({
          pref: res.data
        });
      });
    }
  }

  deletePreference = () => {
    const { user } = this.props;
    axios.delete(`/api/deletePref/${user.id}`).then(res => {
      this.setState({
        pref: []
      });
    });
  };
  editPreference = () => {
    const { rooms, gender, smoke, pets, profession, bio } = this.state;
    const { user } = this.props;
    axios
      .put(`/api/editPreference/`, {
        rooms,
        gender,
        smoke,
        pets,
        profession,
        bio,
        id: user.id
      })
      .then(res => {
        // console.log(res);
        this.setState({ pref: res.data, addOrEdit: false });
      });
  };
  addPreference = () => {
    const { rooms, gender, smoke, pets, profession, bio } = this.state;
    const { user } = this.props;
    axios
      .post(`/api/addPreference/`, {
        rooms,
        gender,
        smoke,
        pets,
        profession,
        bio,
        id: user.id
      })
      .then(res => {
        // console.log(res);
      });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    console.log(this.props);
    if (this.state.pref.length === 0) {
      return (
        <div>
          <p>You have no preference, please add some!</p>

          <button onClick={() => this.setState({ addOrEdit: true })}>
            Add Your Preferences
          </button>
        </div>
      );
    }

    const currentInfo = this.state.pref.map(preference => {
      console.log(preference)
      const { rooms, gender, smoke, pets, profession, bio } = this.state;
      return (
        <div key={preference.id}>
          <div key={preference.id}>
            <h2>Your Information</h2>

            <div className="card card_current">
              <img src={preference.profile_pic} alt="Avatar" />
              <div className="container">
                <h3>
                  <span>Number of Rooms You Want:</span>
                  {preference.rooms}
                </h3>
                <h3>
                  <span>Your gender:</span>
                  {preference.gender}
                </h3>
                <h3>
                  <span>Do You Smoke:</span>
                  {preference.smoke}
                </h3>
                <h3>
                  <span>Pets..</span>
                  {preference.pets}
                </h3>
                <h3>
                  <span>Your Profession:</span>
                  {preference.profession}
                </h3>
                <h3>
                  <span>Bio:</span>
                  {preference.bio}
                </h3>
                <div id="pref-buttons">
                  <button onClick={this.deletePreference}>DELETE</button>
                  <button onClick={() => this.setState({ addOrEdit: true })}>
                    UPDATE
                  </button>
                </div>
              </div>
            </div>
            {/* <h1>These are your roomate preferences...</h1

          <button onClick={this.deletePreference}>
            Delete Your Preferences
          </button>
          <button onClick={() => this.setState({addOrEdit: true})}>
            Update Your Preferences
          </button> */}
          </div>
          {this.state.addOrEdit ? (
            <div>
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
                <select
                  value={gender}
                  name="gender"
                  onChange={this.handleChange}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </label>
              <label>
                Do You Smoke:
                <input
                  name="smoke"
                  value={smoke}
                  onChange={this.handleChange}
                  type="text"
                />
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
                  <input
                    placeholder="What Do you do"
                    name="profession"
                    onChange={this.handleChange}
                    value={profession}
                    type="text"
                  />
                </label>
              </label>
              <textarea
                placeholder="A little more about yourself and your ideal roomate"
                onChange={this.handleChange}
                value={bio}
                name="bio"
                id=""
                cols="30"
                rows="10"
              />
              <button onClick={this.editPreference}>Edit</button>
            </div>
          ) : null}
        </div>
      );
    });

    return <div>{currentInfo}</div>;
  }
}
const mapStateToProps = state => {
  const { user, profile_pic } = state.reducer;
  return { user, profile_pic };
};
export default connect(mapStateToProps)(CurrentUser);

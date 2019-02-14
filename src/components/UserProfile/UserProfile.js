import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      sting: "hi"
    };
  }
  componentDidMount() {
    console.log(this.props.match.params.id);
    axios.get(`/api/users/${this.props.match.params.id}`).then(res => {
      console.log(this.props);
      console.log(res.data);
      this.setState({
        user: res.data
      });
    });
  }

  showTextArea = () => {
    //display text area
  };
  render() {
    const usersList = this.state.user.map(item => {
      console.log(this.props);
      const { user } = this.props;
      return (
        <div className="compare" key={item.id}>
          <div className="profile">
            <h3>{item.rooms}</h3>
            <h3>{item.gender}</h3>
            <h3>{item.smoke}</h3>
            <h3>{item.pets}</h3>
            <h3>{item.profession}</h3>
            <h3>{item.bio}</h3>
          </div>

          {/* <div className="profile2">
            <h3>{user.profession}</h3>
            <h3>{user.rooms}</h3>
            <h3>{user.smoke}</h3>
            <h3>{user.pets}</h3>
            <h3>{user.bio}</h3>
          </div> */}
        </div>
      );
    });
    console.log(this.state);
    console.log("sdfosdf");
    return (
      <div>
        sdfposdfodsfo
        {usersList}
        <textarea
          name="contact"
          id="conctact-me"
          cols="30"
          rows="20"
          placeholder="Contact Me if Intereste"
        />
        <p>
          <button onClick={this.showTextArea}>Contact Me</button>
        </p>
        {/* {this.state.user.pets} */}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { user } = state.userReducer;
  return {
    user
  };
};

export default UserProfile;

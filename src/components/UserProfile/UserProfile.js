import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      preff: []
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
    const { user } = this.props;
    axios.get(`/api/current/${user.id}`).then(res => {
      this.setState({ preff: res.data });
    });
  }

  showTextArea = () => {
    //display text area
  };
  render() {
    console.log(this.props);
    const usersList = this.state.user.map(item => {
      // console.log(this.props);
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
        </div>
      );
    });
    const currentInfo = this.state.preff.map(preference => {
      return (
        <div key={preference.id}>
          <h1>These are your roomate preferences...</h1>
          <h3>{preference.rooms}</h3>
          <h3>{preference.gender}</h3>
          <h3>{preference.smoke}</h3>
          <h3>{preference.pets}</h3>
          <h3>{preference.profession}</h3>
          <h3>{preference.bio}</h3>
        </div>
      );
    });
    console.log(this.state);
    console.log("sdfosdf");
    return (
      <div>
        sdfposdfodsfo
        {usersList}
        {currentInfo}
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
  const { user } = state.reducer;
  return {
    user
  };
};

export default connect(mapStateToProps)(UserProfile);

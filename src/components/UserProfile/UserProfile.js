import React, { Component } from "react";
import axios from "axios";
import "./UserProfile.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: [],
      preff: [],
      email: ""
    };
  }
  componentDidMount() {
    console.log(this.props.match.params.id);
    axios.get(`/api/users/${this.props.match.params.id}`).then(res => {
      console.log(this.props);
      // console.log(res.data);
      this.setState({
        user: res.data
      });
    });
    const { user } = this.props;
    console.log(user);
    axios.get(`/api/current/${user.id}`).then(res => {
      this.setState({ preff: res.data });
    });
    axios.get("/api/posts").then(res => {
      // console.log(res.data);
      this.setState({
        posts: res.data
      });
    });
  }

  sendEmail = () => {
    const { email } = this.state;
    // console.log(this.props)
    const { user } = this.props;
    axios.post("/api/email", {
      email,
      emailSender: user.id,
      emailReceiver: this.props.match.params.id
    });
  };
  handleChange = e => {
    // console.log(e.target.value)
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  render() {
    console.log(this.props.match.params.id);
    const { email } = this.state;
    // console.log(this.props);
    // console.log(this.props.match.params.id)
    const usersList = this.state.user.map(item => {
      console.log(item);
      const { user } = this.props;
      return (
        <div key={item.id}>
          <div>
            <h2>{`${item.username}'s roomate preferences`}</h2>
            <img src={item.profile_pic} />
            <h3>Prefered Number of Rooms:{item.rooms}</h3>
            <h3>Gender:{item.gender}</h3>
            <h3>Smoke:{item.smoke}</h3>
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
          <h2>Your roomate preferences...</h2>
          <img src={preference.profile_pic} />
          <h3>{preference.rooms}</h3>
          <h3>{preference.gender}</h3>
          <h3>{preference.smoke}</h3>
          <h3>{preference.pets}</h3>
          <h3>{preference.profession}</h3>
          <h3>{preference.bio}</h3>
        </div>
      );
    });

    return (
      <div className="compare">
        <div className="profiles">
          <div className="profile1 ">{usersList}</div>
          <div className="profile2">{currentInfo}</div>
        </div>
        <div>
          <div class="form-style-3">
            <form>
              <fieldset>
                <legend>Message</legend>
                <label for="field6">
                  <span>
                    Message <span class="required">*</span>
                  </span>
                  <textarea
                    name="field6"
                    class="textarea-field"
                    placeholder="Contact Me if Interested"
                    onChange={this.handleChange}
                  />
                </label>
                <label>
                  <span> </span>
                  <input
                    type="submit"
                    onClick={this.sendEmail}
                    value="Submit"
                  />
                </label>
              </fieldset>
            </form>
          </div>
        </div>
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

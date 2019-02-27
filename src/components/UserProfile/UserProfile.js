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
          <div className="profile1">{usersList}</div>
          {/* <div className="vs">
            <img src="data:image/jpeg;base64,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" />
          </div> */}
          <div className="profile2">{currentInfo}</div>
        </div>

        {/* <textarea
              name="email"
              value={email}
              id="conctact-me"
              cols="30"
              rows="20"
              placeholder="Contact Me if Intereste"
              onChange={this.handleChange}
            /> */}

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

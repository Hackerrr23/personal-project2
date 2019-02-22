import React, { Component } from "react";
import axios from "axios";
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
    const {user} = this.props
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

    return (
      <div>
        sdfposdfodsfo
        {usersList}
        {currentInfo}
        <textarea
          name="email"
          value={email}
          id="conctact-me"
          cols="30"
          rows="20"
          placeholder="Contact Me if Intereste"
          onChange={this.handleChange}
        />
        <p>
          <button onClick={this.sendEmail}>Contact Me</button>
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

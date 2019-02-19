import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      personCommenting: 0,
      commentersInfo: []
    };
  }
  componentDidMount() {
    const { user } = this.props;
    axios
      .get(`/api/notifications/${user.id}`)
      .then(res => {
        this.setState({
          notifications: res.data,
          personCommenting: res.data[0].personcommenting,
          commentersUsername: ""
        });
        console.log(res.data);
        console.log(res.data[0].personcommenting);
        console.log(this.state);
        console.log(this.state.personCommenting);
      })
      .then(res => {
        const { personCommenting } = this.state;
        axios.get(`/api/personCommenting/${personCommenting}`).then(res => {
          console.log(res.data);
          this.setState({
            commentersInfo: res.data
          });
        });
      });
  }
  render() {
    const { user } = this.props;
    console.log(user);
    const commentersInfo = this.state.commentersInfo.map(commenter => {
      const { comment } = this.state.notifications[0];
      return (
        <div key={commenter.id}>
          <Link to={`/users/${user.id}`}>
            <h4>{commenter.username} commented on your post: </h4>
          </Link>
          <p>{comment}</p>
        </div>
      );
    });
    return (
      <div>
        Here are your notifications
        {commentersInfo}
      </div>
    );
  }
}
const maptStateToprops = state => {
  const { user } = state.reducer;
  return { user };
};
export default connect(maptStateToprops)(Notifications);

import React, { Component } from "react";
import axios from "axios";
import "./Notifications.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersPosts: [],
      peopleAndComments: []
    };
  }
  componentDidMount() {
    const { user } = this.props;

    axios.get(`/api/notifications/${user.id}`).then(res => {
      // console.log(res.data);
      if (res.data[0]) {
        //  check if the user has any posts
        this.setState({ usersPosts: res.data });
        // console.log(this.state.usersPosts)

        axios.get(`/api/peopleAndCommentes/${this.props.user.id}`).then(res => {
          //join statement of users and comments where ownerofpost = user.id
          // console.log(res.data);
          if (res.data[0]) {
            this.setState({ peopleAndComments: res.data });
          }
        }); //
      }
    });
  }

  render() {
    const displayNotifications = this.state.usersPosts.map(post => {
      return this.state.peopleAndComments.map(commenters => {
        if (post.id == commenters.ownerofpost) {
          return (
            <div className="home1" key={commenters.id}>
              <div className="home2">
                <div className="users commenters">
                <Link to={`/users/${commenters.id}`}>{commenters.username}</Link>
                <h2>
                <img className="pics" src={commenters.profile_pic} />
                  {/* <span>commented on your post...</span> */}
                </h2>
                <div className="comments">
                  <h2>{commenters.comment}</h2>
                </div>
              </div>
              </div>
            </div>
          );
        }
      });
    });
    if(!this.state.usersPosts[0]){
      return <div>
        <h1>No Notifications yet. Make a post and get interactive </h1>
      </div>
    }
    return <div className="notifications">{displayNotifications}</div>;
  }
}
const maptStateToprops = state => {
  const { user } = state.reducer;
  return { user };
};
export default connect(maptStateToprops)(Notifications);

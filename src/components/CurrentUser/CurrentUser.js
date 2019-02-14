import React, { Component } from "react";
import { connect } from "react-redux";
import { getUser } from "../../ducks/userReducer";
class CurrentUser extends Component {
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>{user.gender}</h1>
        <h1>{user.profession}</h1>
        <h1>{user.smoke}</h1>
        <h1>{user.pets}</h1>
        <h1>{user.bio}</h1>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { user } = state.userReducer;
  return { user };
};
export default connect(
  mapStateToProps,
  { getUser }
)(CurrentUser);

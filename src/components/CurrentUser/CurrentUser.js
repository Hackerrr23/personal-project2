import React, { Component } from "react";
// import {getCurrentPref} from "../../ducks/userReducer"
import axios from "axios";
import { connect } from "react-redux";
class CurrentUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pref: []
    };
  }
  componentDidMount() {
    const { user } = this.props;
    axios.get(`/api/current/${user.id}`).then(res => {
      this.setState({ pref: res.data });
    });
  }
  render() {
    console.log(this.props.user);
    console.log(this.props);
    console.log(this.state);

    const currentInfo = this.state.pref.map(preference => {
      return (
        <div key={preference.id}>
          <h1>These are your roomate preferences...</h1>
          <h3>{preference.rooms}</h3>
          <h3>{preference.gender}</h3>
          <h3>{preference.smoke}</h3>
          <h3>{preference.pets}</h3>
          <h3>{preference.profession}</h3>
          <h3>{preference.bio}</h3>

          <button>Delete Preferences</button>
          <button>Add More Preferences</button>
        </div>
      );
    });
    return (
      <div>
        hello from current
        {currentInfo}
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { user, pref } = state.reducer;
  return { user, pref };
};

export default connect(mapStateToProps)(CurrentUser);

// import React, { Component } from "react";
// import { connect } from "react-redux";
// import { getUser } from "../../ducks/userReducer";
// class CurrentUser extends Component {
//   componentDidMount() {
//     this.props.getUser();
//   }
//   render() {
//     // const { user } = this.props;
//     console.log(this.props)
//     return (
//       {/* <div>
//         <h1>{user.gender}</h1>
//         <h1>{user.profession}</h1>
//         <h1>{user.smoke}</h1>
//         <h1>{user.pets}</h1>
//         <h1>{user.bio}</h1>
//       </div> */}
//     );
//   }
// }
// const mapStateToProps = state => {
//   // const { user } = state.userReducer;
//   // return { user };
// };
// export default connect(
//   mapStateToProps
//   // { getUser }
// )(CurrentUser);

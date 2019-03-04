import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios"
import "./Header.css";
import { connect } from "react-redux";

class Header extends Component {
  constructor(props){
    super(props)
    this.state = {
      profile:""
    }
  }
  componentDidMount() {
    const { user } = this.props;
    axios.get(`/api/profile_pic/${user.id}`).then(res => {;
      console.log(res.data)
      this.setState({ profile: res.data });
    });
  }
  render() {
    console.log(this.props);
    return (
      <div className="header">
        <nav>
          <section>
          <span><i class="fab fa-fort-awesome animated bounce"></i></span>
            <Link to="/">
              <h1>ROOMIES</h1>
            <span>Find Your Perfect Roomate</span>
            </Link>
          </section>
          {this.props.user.username ? (
            <>
              <ul className="top">
                <Link to="/home">
                  <li>See Others</li>
                </Link>
                <Link to="/current">
                  <li>Your Profile</li>
                </Link>
                <Link to="/posts">
                  <li>Postings</li>
                </Link>
                <Link to="/notifications">
                  <li id="notifications">Notifications<span><i class="far fa-bell"></i></span></li>
                </Link>
                {this.props.profile_pic.profile_pic ? (
                          <>
                            <img src={this.props.profile_pic.profile_pic} />
                          </>
                        ) : (
                            <img src={this.props.user.profile_pic} />
                          
                        )}
              </ul>
            </>
           ) : (
            <p>test</p> 
          ) }
        </nav>
      </div>
    );
  }
}
const mapStateToProps = state => {
  const { user,profile_pic } = state.reducer;
  // console.log(state);
  return { user,profile_pic };
};

export default connect(mapStateToProps)(Header);

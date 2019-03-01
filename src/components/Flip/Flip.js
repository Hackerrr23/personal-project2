import React, { Component } from "react";
import "./Flip.css"
import {connect} from "react-redux"
class Flip extends Component {
  constructor(props) {
    super(props);
  }
  render(){
    const {user} = this.props
      return(

            <div class="flip-card">
            <div class="flip-card-inner">
                <div class="flip-card-front">
                <img src="https://imgix.bustle.com/uploads/getty/2019/2/27/ec7ed16c-de0d-454f-9e88-0f887c6b8261-getty-988380014.jpg?w=970&h=546&fit=crop&crop=faces&auto=format&q=70" alt="Avatar" />
                </div>
                <div class="flip-card-back">
                <h1>John Doe</h1> 
                <p>Architect & Engineer</p> 
                <p>We love that guy</p>
                </div>
            </div>
            </div>
      )
  }
}
const maptStateToProps = state => {
  const { user } = state.reducer;
  return {
    user
  };
};
export default connect(maptStateToProps)(Flip)
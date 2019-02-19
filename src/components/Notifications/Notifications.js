import React, { Component } from "react";
import axios from 'axios'
import { connect } from "react-redux";
class Notifications extends Component {
    constructor(props){
        super(props)
        this.state = {
            notifications: []
        }
    }
    componentDidMount(){
        const {user} = this.props
        axios.get(`/api/notifications/${user.id}`).then(res => {
            console.log(res.data)
            this.setState({
                notifications: res.data
            })
        })
    }
  render() {
    return <div>Hello from Notifications
            
    </div>;
  }
}
const maptStateToprops = state => {
  const { user } = state.reducer;
  return {user}
};
export default connect(maptStateToprops)(Notifications);

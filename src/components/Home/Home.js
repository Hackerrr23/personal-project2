import React, { Component } from 'react'
import axios from 'axios'
import {Link} from "react-router-dom"
 class Home extends Component {
 constructor(props){
   super(props)
   this.state = {
     users:[],
     sting: "hi"
   }
   
 }

  componentDidMount(){
    axios.get("/api/users").then( res => {
      console.log(res.data)
      this.setState({
        users: res.data
      })
    })
  }
  render() {
    const usersList = this.state.users.map((user,id) => {
      return (
          <div key={user.id}>
             <Link to={`/users/${user.id}`}><h1>{user.username}</h1></Link>
            <h3>{user.username}</h3>
            <h3>{user.username}</h3>
          </div>
      )
    })
    console.log(this.state)
    console.log("sdfosdf")
    return (
      <div>
        Hey whats up how you doing
        {usersList}
      </div>
    )
  }
}

export default Home

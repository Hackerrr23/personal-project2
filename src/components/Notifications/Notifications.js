import React, { Component } from "react";
import axios from "axios";
import "./Notifications.css";
// import Carousel from 'nuka-carousel';
// import "~slick-carousel/slick/slick.css";
// import "~slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
class Notifications extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersPosts: [],
      peopleAndComments: [],
      commentersPref: []
    };
  }
  componentDidMount() {
    const { user } = this.props;

    axios.get(`/api/notifications/${user.id}`).then(res => {
      console.log(res.data);// we get this back
      console.log(user)
      if (res.data[0]) { //  check if the user has any posts
        
        this.setState({ usersPosts: res.data });
        console.log(this.state.usersPosts)
          console.log(this.props.user.id)
        axios.get(`/api/peopleAndComments/${this.props.user.id}`).then(res => {
          //join statement of users and comments where ownerofpost = user.id
          console.log(res.data);
          if (res.data[0]) {
            this.setState({ peopleAndComments: res.data });
          }
        }); //
      }
    });
    axios.get("/api/commentersPreferences").then(response => {
      console.log(response.data);
      this.setState({ commentersPref: response.data });
    });
  }

  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 4000,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      // autoplay: true
    };
    // let displayNotifications = this.state.usersPosts.map(post => {

    //   return this.state.peopleAndComments.map(commenters => {
    //     console.log(commenters);
    //     if (post.user_id == commenters.ownerofpost) {
    //       return this.state.commentersPref.map(pref => {
    //         if (pref.user_id === commenters.personcommenting) {
    //           return (
    //             <div className="containing-carousel">
    //               <div className="newer">
    //                 <div className="commenters">
    //                   <img src={commenters.profile_pic} />
    //                   <div className="info">
    //                     <h5>
    //                       <Link to={`/users/${commenters.personcommenting}`}>
    //                         Contact
    //                       </Link>{" "}
    //                       {commenters.username}
    //                     </h5>
    //                     <br />
    //                     {/* <h2>{pref.gender}</h2> */}
                        // {pref.gender === 'male' || pref.gender ==="Male" ? (
                        //   <>
                        //     <i class="fas fa-male" />
                        //   </>
                        // ) : (
                        //   <i class="fas fa-female" />
                        // )}
    //                   </div>
    //                   {/* <img src={commenters.profile_pic} /> */}
    //                 </div>

    //                 <div className="comment_stuff">
    //                   <h4>{commenters.comment}</h4>
    //                   <h4>{commenters.smoke}</h4>
    //                   <div>
    //                     <p>{pref.bio}</p>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           );
    //         }
    //       });
    //     }
    //   });
    // });
    const displayNotifications = this.state.usersPosts.map(post => {
      return this.state.peopleAndComments.map(commenters => {
        console.log(commenters)
        if (post.user_id == commenters.ownerofpost) {
          return (
            this.state.commentersPref.map(pref => {
              if(pref.user_id == commenters.personcommenting){
               return (
                 <div className="containing-carousel">
                   <div className="newer">
                   <div className="commenters">
                     <img src={commenters.profile_pic} />
                     <h2><Link to={`/users/${commenters.personcommenting}`}>Contact</Link> {commenters.username}</h2><br></br>
                     <h2>{pref.gender}</h2>
                     {/* <img src={commenters.profile_pic} /> */}
                   </div>

                   <div className="comment_stuff">
                     <h2>{commenters.email}</h2>
                     <h2>{commenters.comment}</h2>
                     <h2>{commenters.smoke}</h2>
                     <h2>{pref.gender}</h2>
                     <h2>{pref.bio}</h2>
                   </div>
                   </div>
                   
                 </div>
               );
              }
            })
          )
        
        }
      });
    });
    if (!this.state.usersPosts[0]) {
      return (
        <div>
          <h1>No Notifications yet. Make a post and get interactive </h1>
          {/* <i class="fas fa-female"></i> */}
        </div>
      );
    }
    return (
      <div className="notifications">
        <h2> Your Notifications</h2>
        <Slider {...settings}>{displayNotifications}</Slider>
      </div>
    );
  }
}
const maptStateToprops = state => {
  const { user } = state.reducer;
  return { user };
};
export default connect(maptStateToprops)(Notifications);

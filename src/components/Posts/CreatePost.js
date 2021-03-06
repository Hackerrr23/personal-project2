import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import "./CreatePost.css";
import { Link } from "react-router-dom";
import { createPost } from "../../ducks/postReducer";
class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: "Need A Room",
      post: "",
      title: "",
      comment: "",
      comments: [],
      posts: [],
      addComment: false,
      poster: "",
      users: [],
      file: null
    };
  }
  componentDidMount() {
    axios.get("/api/posts").then(res => {
      // console.log(res.data);
      this.setState({
        posts: res.data
      });
    });
    axios.get("/api/comments").then(res => {
      console.log(res.data);
      this.setState({
        comments: res.data
      });
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.comments.length !== prevState.comments.length) {
      //   this.setState({

      //     posts: this.state.posts
      //   });
      console.log("hit test");
      axios.get("/api/comments").then(res => {
        console.log(res.data);
        this.setState({
          comments: res.data
        });
      });
    }
    // if (this.state.posts.length !== prevState.posts.length) {
    //   //   this.setState({

    //   //     posts: this.state.posts
    //   //   });
    //   console.log("hit test");
    //   axios.get("/api/comments").then(res => {
    //     console.log(res.data);
    //     this.setState({
    //       posts: res.data
    //     });
    //   });
    // }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange2 = event => {
    // console.log(this.state);
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { user } = this.props;
    const { title, type, post } = this.state;
    axios
      .post("/api/createPost", { title, type, post, user: user.id })
      .then(res => {
        // console.log(res.data)
        this.setState({
          posts: [...this.state.posts, res.data]
        });
      });
  };

  handleSubmit2 = event => {
    event.preventDefault();
    const { comment, addComment, poster } = this.state;
    const { user } = this.props;
    // console.log(this.state.poster);
    axios
      .post("/api/createComment", {
        comment,
        personCommenting: user.id,
        poster,
        id: addComment
      })
      .then(res => {
        this.setState({
          addComment: false,
          comments: res.data
        });
      });
  };
  submitFile = event => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", this.state.file[0]);
    axios
      .post(`/test-upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then(response => {
        // handle your response;
      })
      .catch(error => {
        // handle your error
      });
  };

  handleFileUpload = event => {
    this.setState({ file: event.target.files });
  };

  render() {
    const { type, post, title, comment } = this.state;
    const { user } = this.props;

    const showPosts = this.state.posts.map((post, i) => {
      // console.log(post.user_id);
      return (
        <div className="containing_posts" key={post.id}>
          <div className="posts">
            <div className="posters">
              <img src={post.profile_pic} />
              <Link to={`/users/${post.user_id}`}>
                <h4>
                  {post.title} ---{post.type}
                </h4>
              </Link>
            </div>
            <h3 className="post">{post.post}</h3>
            <div className="jumbotron-div col s12">
              <h3>Comments...</h3>
              <ul className="collection">
                {this.state.comments.map(comment => {
                  if (post.id === comment.post_id) {
                    return (
                      <div className="comments">
                        <img src={comment.profile_pic} />
                        <p>{comment.comment}</p>
                      </div>
                    );
                  }
                })}
              </ul>
            </div>

            {this.state.addComment === post.id ? (
              <div>
                <input
                  type="text"
                  value={comment}
                  onChange={this.handleChange2}
                  name="comment"
                  placeholder="comment here"
                />
                <button onClick={this.handleSubmit2}>Post Comment</button>
              </div>
            ) : (
              <button
                className="btn-comments"
                id="up"
                onClick={() =>
                  this.setState({ addComment: post.id, poster: post.user_id })
                }
              >
                Add a comment
              </button>
            )}
          </div>
        </div>
      );
    });
    return (
      <div className="create_post">
        <div className="post_creating">
          <h4 id="first-h1">
            Create A Post Here To Find Potential Roomates Nearby
          </h4>
          <div className="title">
            <label>
              Post:
              <input
                placeholder="Post Title"
                name="title"
                onChange={this.handleChange}
                value={title}
                type="text"
              />
            </label>
            <label>
              Your Rooming Sitution:
              <select value={type} name="type" onChange={this.handleChange}>
                <option value="Need A Room">Need A Room</option>
                <option value="Have A Room">Have A Room</option>
              </select>
            </label>
          </div>
          <h4 />
          <textarea
            placeholder="What Are You Looking For"
            onChange={this.handleChange}
            value={post}
            name="post"
            id=""
          />
          <button onClick={this.handleSubmit}>Post</button>
          <hr />
        </div>
        {showPosts}
      </div>
    ); //show post ends
  }
}
const mapStateToProps = state => {
  const { user } = state.reducer;
  return { user };
};

export default connect(
  mapStateToProps,
  { createPost }
)(CreatePost);

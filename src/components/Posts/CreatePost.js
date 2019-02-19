import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
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
      poster: ""
    };
  }
  componentDidMount() {
    axios.get("/api/posts").then(res => {
      console.log(res.data);
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
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChange2 = event => {
    console.log(this.state);
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { user } = this.props;
    const { title, type, post } = this.state;
  };
  handleSubmit2 = event => {
    event.preventDefault();
    const { comment, addComment,poster } = this.state;
    const {user} = this.props
    console.log(this.state.poster);
    axios.post("/api/createComment", { comment,personCommenting: user.id,poster, id: addComment }).then(res => {
      this.setState({
        addComment: false,
        comments: res.data
      });
    });
  };

  render() {
    const { type, post, title, comment } = this.state;
    const { user } = this.props;
    console.log(user.id)

    const showPosts = this.state.posts.map((post, i) => {
      return (
        <div key={post.id}>
          <h1>{post.username}</h1>
          <h2>
            <Link to={`/users/${user.id}`}>{post.title}</Link> ---{post.type}
          </h2>
          <h3>{post.post}</h3>
          <div className="jumbotron-div col s12">
            <ul className="collection">
              {this.state.comments.map(comment => {
                if (post.id === comment.post_id) {
                  return (
                    <h5
                      key={comment.id}
                      className="collection-item left-align purple lighten-2"
                    >
                      <p>{comment.comment}</p>
                    </h5>
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
              onClick={() =>
                this.setState({ addComment: post.id, poster: post.user_id })
              }
            >
              Add a comment
            </button>
          )}
        </div>
      );
    });
    return (
      <div>
        <h1>Create A Post Here To Find Potential Roomates Nearby</h1>

        <label>
          Title of Post:
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

        <textarea
          placeholder="What Are You Looking For"
          onChange={this.handleChange}
          value={post}
          name="post"
          id=""
          cols="20"
          rows="10"
        />
        <button onClick={this.handleSubmit}>Post</button>
        {showPosts}
      </div>
    );
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
